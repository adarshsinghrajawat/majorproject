const styles = {
  heading: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: 'Kanit',
    fontSize: '24px',
    marginBottom: '20px'
  }
};

export default function Heading({ title }) {
  return (
    <div style={styles.heading}>
      <img src="/logo.png" alt="Logo" style={{ width: '50px', height: '50px' }} />
      <span>{title}</span>
    </div>
  );
}