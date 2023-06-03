export const data = {
  datasets: [
    {
      data: [50, 50, 50],
      backgroundColor: ['#FF7373', '#FFDF5C', '#55C763'],
      borderWidth: 0
    }
  ]
};
export const options = {
  responsive: true,
  cutout: '75%'
};

export const getPlugins = (textInput) => {
  let plugin = [
    {
      beforeDraw: function (chart) {
        let width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        ctx.font = '700 24px ';
        ctx.fillStyle = '#ffffff';
        ctx.fontStretch = 'bold';
        ctx.textBaseline = 'top';
        let text = textInput,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2.4;
        ctx.fillText(text, textX, textY);
        ctx.save();
      }
    }
  ];
  return plugin;
};
