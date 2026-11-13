// Affiche la photo si un chemin est donné, sinon un emplacement vide.
export default function Photo({ src, alt, label = "Photo à ajouter", className = "", eager = false }) {
  if (src) {
    return <img src={src} alt={alt} className={`photo ${className}`} loading={eager ? "eager" : "lazy"} decoding="async" />
  }
  return (
    <div className={`photo photo-vide ${className}`} role="img" aria-label={alt}>
      <span>{label}</span>
    </div>
  )
}
