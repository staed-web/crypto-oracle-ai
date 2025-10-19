import { createChart } from 'lightweight-charts';

let chart;

window.addEventListener('load', () => {
  if (document.getElementById('chartContainer')) {
    initChart();
    simulateRealTimeData();
  }
});

function initChart() {
  chart = createChart(document.getElementById('chartContainer'), {
    width: document.getElementById('chartContainer').clientWidth,
    height: 500,
    layout: { backgroundColor: '#0f0f1b', textColor: '#e0e0ff' },
    grid: { vertLines: { color: '#1a1a2e' }, horzLines: { color: '#1a1a2e' } },
    crosshair: { mode: 0 },
    priceScale: { borderColor: '#444' },
    timeScale: { borderColor: '#444', timeVisible: true }
  });

  const candleSeries = chart.addCandlestickSeries({
    upColor: '#4bcc8a',
    downColor: '#ff4d94',
    borderVisible: false,
    wickUpColor: '#4bcc8a',
    wickDownColor: '#ff4d94'
  });

  // Mock historical data
  const data = [];
  let price = 60000;
  for (let i = 0; i < 100; i++) {
    const open = price;
    const close = open + (Math.random() - 0.5) * 500;
    const high = Math.max(open, close) + Math.random() * 200;
    const low = Math.min(open, close) - Math.random() * 200;
    data.push({ time: Date.now() / 1000 - (100 - i) * 60, open, high, low, close });
    price = close;
  }
  candleSeries.setData(data);
}
