const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const dataSet = d3.json(url).then(function(data) {
    console.log(data);
  });


  function init() {

  let trace1 = {
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16],
    type: "bar"
  };

  Plotly.newPlot("bar", [trace1]);

}

//   let trace2 = {
//     x: [0,1,2,3],
//     y: [12,43,34,76],
//     type: "bubble"
//   };

//   Plotly.newPlot("bubble", [trace2]);

d3.selectAll("#selDataset").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");

  // Initialize x and y arrays
  let x = [];
  let y = [];

  if (dataset === 'dataset1') {
    x = [1, 2, 3, 4, 5];
    y = [1, 2, 4, 8, 16];
  }

  else if (dataset === 'dataset2') {
    x = [10, 20, 30, 40, 50];
    y = [1, 10, 100, 1000, 10000];
  }

  // Note the extra brackets around 'x' and 'y'
  Plotly.restyle("bar", "x", [x]);
  Plotly.restyle("bar", "y", [y]);
}

init();