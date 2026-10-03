const Chartbox = (id, arrlabels, arrdata) => {
  setTimeout(() => {
    const getcanvas = document.getElementById(id).getContext('2d');

    const chart = new Chart(getcanvas, {
      type: 'bar',
      data: {
        labels: [...arrlabels],
        datasets: [...arrdata],
      },
    });

    document.addEventListener('change', (e) => {
      if (e.target.matches(`.chart${id}`)) {
        e.preventDefault();
        chart.config.type = e.target.value;
        chart.update();
      }
    });
  }, 1000);

  return `
<div class="chartbox" >
<div class="chart-wrapper">

<select class="chart-selector chart${id}">
<option value="bar">Bar Chart</label>
<option value="line">Line Chart</label>
<option value="pie">Pie Chart</label>
</select>



</div>
<canvas id="${id}"></canvas>
</div>

`;
};

export default Chartbox;
