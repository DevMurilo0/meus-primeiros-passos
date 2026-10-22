import { useState } from 'react';
import { ArrowUpRight, MapPin, MapPinned, Navigation2 } from 'lucide-react';
import { school } from '../config/school';

/**
 * Prévia abstrata do bairro, nunca apresentada como mapa geográfico em escala.
 * O Google Maps real é solicitado somente quando a pessoa optar por carregá-lo.
 */
export function SchoolMap() {
  const [loaded, setLoaded] = useState(false);
  return <div className="footer-map">
    {loaded ? (
      <iframe
        title="Mapa interativo da Escola Meus Primeiros Passos em Gravatá"
        src={school.mapsEmbedUrl}
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    ) : (
      <div className="map-preview">
        <svg viewBox="0 0 440 440" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
          <rect width="440" height="440" fill="#e7ead8"/>
          <path d="M-50 150 510 150M-50 295 510 295M135-80 135 520M305-80 305 520" stroke="#fff6ed" strokeWidth="59" fill="none"/>
          <path d="M-50 150 510 150M-50 295 510 295M135-80 135 520M305-80 305 520" stroke="#d8cfc5" strokeWidth="2" fill="none" strokeDasharray="8 12"/>
          <path d="M-25 360Q90 340 150 420T440 315" stroke="#a9d7be" strokeWidth="78" fill="none"/>
          <path d="M0 400Q170 305 440 375" stroke="#fcf9e8" strokeWidth="28" fill="none" opacity=".75"/>
          <rect x="175" y="174" width="88" height="88" rx="28" fill="#fff5e9" transform="rotate(9 219 218)" />
          <circle cx="220" cy="213" r="38" fill="#f15b6c"/>
          <path d="M220 192a17 17 0 0 0-17 17c0 12 17 30 17 30s17-18 17-30a17 17 0 0 0-17-17Z" fill="#24313d"/>
          <circle cx="220" cy="209" r="6" fill="#fff5e9"/>
          <path d="M33 34c20 15 31 42 43 73M379 25c-18 26-16 59-2 91" stroke="#21a8a0" strokeWidth="14" strokeLinecap="round" opacity=".55"/>
        </svg>
        <span className="map-preview-title">Boa Vista<br/><strong>Gravatá · PE</strong></span>
        <span className="map-preview-disclaimer">Ilustração de localização · sem escala</span>
      </div>
    )}
    <div className="map-preview-actions">
      {loaded ? <a className="map-open-action" href={school.mapsUrl} target="_blank" rel="noopener noreferrer">Abrir no Google Maps <ArrowUpRight size={17}/></a>
        : <button type="button" className="map-open-action" onClick={() => setLoaded(true)}><MapPinned size={19}/> Explorar mapa interativo <Navigation2 size={15}/></button>}
    </div>
    <span className="map-corner" aria-hidden="true"><MapPin size={15}/> Gravatá · PE</span>
  </div>;
}
