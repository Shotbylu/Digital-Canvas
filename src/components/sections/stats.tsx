export function Stats() {
  const metrics = [
    { value: 'R350k+', label: 'Managed media spend' },
    { value: '4.2:1', label: 'Average return on ad spend' },
    { value: 'R85', label: 'Best cost per lead' },
    { value: '3', label: 'Industries served' },
  ];

  return (
    <section className="proof-strip" aria-label="Selected performance metrics">
      <div className="proof-strip__inner">
        <div className="proof-strip__intro"><span className="eyebrow">The work, in numbers</span><p>Performance grounded in real business goals.</p></div>
        {metrics.map((item) => <div className="proof-metric" key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}
      </div>
    </section>
  );
}
