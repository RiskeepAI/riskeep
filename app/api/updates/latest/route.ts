import { NextRequest, NextResponse } from 'next/server'
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js'
import { getClientIp, isRateLimited } from '@/lib/rate-limit'

// Endpoint PÚBLICO a propósito (sin auth) — lo consulta el launcher de ARIA
// en cada arranque, incluso antes de haber iniciado sesión. Ver
// launcher_gui/updater.py en trading_ia para el consumidor.
//
// No confundir con /api/license: ese devuelve datos ligados al usuario
// (plan/suscripción) y requiere Bearer token; este devuelve metadata de
// release igual para todo el mundo, cacheable en CDN.

function getAdminClient() {
  return createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function GET(req: NextRequest) {
  if (isRateLimited(`updates:${getClientIp(req)}`, 30, 60_000)) {
    return NextResponse.json({ error: 'Demasiadas peticiones, inténtalo en un minuto' }, { status: 429 })
  }

  const channel = req.nextUrl.searchParams.get('channel') || 'stable'

  const admin = getAdminClient()
  const { data: release, error } = await admin
    .from('releases')
    .select('core_version, core_zip_path, core_sha256, min_supported_core_version, shell_version, shell_download_url_mac, shell_download_url_win, mandatory, release_notes, published_at')
    .eq('channel', channel)
    .eq('yanked', false)
    .order('published_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('[updates/latest] DB error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }

  if (!release) {
    return NextResponse.json({ error: 'No hay releases publicadas' }, { status: 404 })
  }

  const { data: pub } = admin.storage
    .from('core-releases')
    .getPublicUrl(release.core_zip_path)

  return NextResponse.json(
    {
      coreVersion:             release.core_version,
      coreDownloadUrl:         pub.publicUrl,
      coreSha256:              release.core_sha256,
      minSupportedCoreVersion: release.min_supported_core_version,
      shellVersion:            release.shell_version,
      shellDownloadUrl: {
        mac: release.shell_download_url_mac,
        win: release.shell_download_url_win,
      },
      mandatory:     release.mandatory,
      releaseNotes:  release.release_notes,
      publishedAt:   release.published_at,
    },
    {
      headers: {
        // Cacheable en CDN — el launcher además cachea localmente entre
        // arranques (updater.py solo escribe un pointer nuevo si cambia).
        'Cache-Control': 'public, max-age=600, s-maxage=600',
      },
    }
  )
}
