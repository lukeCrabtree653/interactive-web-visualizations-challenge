const samples = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

d3.json(samples).then((data) => {

    var names = data.names;
    d3.select('#selDataset').selectAll('option').data(names).enter().append('option').text((data) => {
        return data;
    });
});

function optionChanged(value) {
    d3.json(samples).then((data) => {
        var samp_values = data.samples;
        var otuIDs = [];
        var sampleValues = [];
        var otuLabels = [];
        var otuArray = [];

        samp_values.forEach(person => {
            if(person.id == value) {
                otuIDs = person.otu_ids;
                sampleValues = person.sample_values;
                otuLabels = person.otu_labels;
                otuIDs.map(otuSelection => {
                    otuArray.push(`OTU: ${otuSelection}`);
                });
            }
        });
    
        var washes = 0;
        var metadata = data.metadata;
        metadata.forEach(person => {
            if(person.id == value){
                var details = Object.entries(person);
                washes = details[6][1];
                d3.select('#sample-metadata').selectAll('p').data(details).enter().append('p').text(info => {
                    return `${info[0]}: ${info[1]}`;
                });
            }
        });

        let top_ten = sampleValues.slice(0,10).reverse()
        let top_ten_ids = otuArray.slice(0,10).reverse()
        let bar_text = otuLabels.slice(0,10).reverse()

        var bar_trace = {
            x: top_ten,
            y: top_ten_ids,
            type: 'bar', 
            orientation: 'h',
            text: bar_text
        }

        var bar_data = [bar_trace];

        var bar_layout = {
            title: "Top Ten OTUs Present for Test Subject", 
            height: 500,
            width: 550
        }

        Plotly.newPlot('bar', bar_data, bar_layout);
        
        var bubble_trace = {
            x: otuIDs,
            y: sampleValues,
            mode: 'markers',
            marker: {
                size: sampleValues,
                color:otuIDs,
                colorscale: 'YlGnBu'
            },
            text: otuLabels
        }

        var bubble_data = [bubble_trace];

        var bubble_layout = {
            title: "All OTUs Present for Test Subject", 
            xaxis: {
                title: "OTU ID"
            }
        }

        Plotly.newPlot('bubble', bubble_data, bubble_layout);

        var gauge_trace = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: washes,
              title: "Test Subject: Belly Button Washing Frequency",
              type: "indicator",
              mode: "gauge+number+delta",
              delta: {reference: 9, 'increasing': {color: "red"}},
              gauge: {
                axis: { range: [null, 9] },
                bar: {color: "e6c9f5"}, 
                    steps: [
                        { range: [0,1], color: "f5f6f4" },
                        { range: [1,2], color: "ecf5e4" },
                        { range: [2,3], color: "d4f2b8" },
                        { range: [3,4], color: "c0f291" },
                        { range: [4,5], color: "a7e36f" },
                        { range: [5,6], color: "83c744" },
                        { range: [6,7], color: "4cab2c" },
                        { range: [7,8], color: "27b83f" },
                        { range: [8,9], color: "108f3c" },
                        ]},
            }
          ];

          var gauge_layout = { 
              width: 600, height: 500, margin: { t: 20, b: 40 } 
            };

          Plotly.newPlot('gauge', gauge_trace, gauge_layout);
    
    });
}