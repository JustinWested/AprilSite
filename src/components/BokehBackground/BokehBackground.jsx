import styles from './BokehBackground.module.css';

const blobs = [
  { color: '#A1C3D1', size: 320, top: '2%', left: '5%', opacity: 0.55 },
  { color: '#B39BC8', size: 280, top: '5%', right: '8%', opacity: 0.5 },
  { color: '#E64398', size: 240, top: '12%', left: '45%', opacity: 0.38 },
  { color: '#c64191', size: 300, top: '22%', left: '15%', opacity: 0.42 },
  { color: '#A1C3D1', size: 350, top: '28%', right: '5%', opacity: 0.48 },
  { color: '#B39BC8', size: 260, top: '38%', left: '60%', opacity: 0.52 },
  { color: '#E64398', size: 220, top: '45%', left: '2%', opacity: 0.38 },
  { color: '#2a1f3d', size: 280, top: '50%', right: '20%', opacity: 0.2 },
  { color: '#A1C3D1', size: 300, top: '58%', left: '35%', opacity: 0.48 },
  { color: '#c64191', size: 250, top: '65%', right: '10%', opacity: 0.4 },
  { color: '#B39BC8', size: 320, top: '72%', left: '8%', opacity: 0.48 },
  { color: '#E64398', size: 270, top: '80%', left: '55%', opacity: 0.38 },
  { color: '#A1C3D1', size: 290, top: '88%', right: '15%', opacity: 0.52 },
  { color: '#B39BC8', size: 240, top: '93%', left: '25%', opacity: 0.45 },
];

export default function BokehBackground() {
  return (
    <div className={styles.bokehLayer} aria-hidden="true">
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={styles.blob}
          style={{
            background: blob.color,
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            right: blob.right,
            opacity: blob.opacity,
          }}
        />
      ))}
    </div>
  );
}
