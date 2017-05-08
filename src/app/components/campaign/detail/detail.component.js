import template from './detail.html';


class Controller {

  constructor($filter, $http, CampaignDetailService, Session) {
    'ngInject';
    this.$filter = $filter;
    this.$http = $http;
    this.session = Session;
    this.service = CampaignDetailService;
    this.trendParams = this.setTrendParams();

    this.trendChart = {};
    this.setTrendChart();
    console.log(this.trendChart);
    this.demographicChart = {};
    this.setDemographicChart();
    this.deviceChart = {};
    this.setDeviceChart();
  }

  $onInit() {
    this.campaign = this.campaignRequest.data.campaign;

    this.service.getTrendData(this.campaign.mcid, this.trendParams)
      // .then((response) => {

      // })
      // .catch((error) => {

      // });

  }

  randomNumber(multiplier, roundMethod) {
    switch(roundMethod) {
    case 'none':
      return Math.random() * multiplier;
    case 'ceil':
      return Math.ceil(Math.random() * multiplier);
    case 'floor':
    default:
      return Math.floor(Math.random() * multiplier);
    }
  }

  setTrendParams() {
    let start = this.$filter('date')(this.session.dateRange.start, 'yyyy-MM-dd');
    let end = this.$filter('date')(this.session.dateRange.end, 'yyyy-MM-dd')
    return {
      breakdown: 'days',
      dates: `${start},${end}`,
      metrics: 'impressions,spend'
    };
  }

  setTrendChart() {
    let filter = this.$filter;
    let chart = this.trendChart;
    let impressionsColor = '#f67002';
    let googleColor = '#bdd964';

    let mockData = [];
    for(let i = 1; i <= 28; i++) {
      let item = {
        date: new Date(2017, 1, i),
        impressions: this.randomNumber(100),
        googleSpend: this.randomNumber(10, 'none'),
        bingSpend:  this.randomNumber(10, 'none'),
        event: (i % 5 === 0 ? this.randomNumber(10, 'ceil') : null)
      };
      mockData.push(item);
    }

    chart.colors = [impressionsColor, googleColor];

    chart.labels = mockData.map((object) => {
      return object.date;
    });
    chart.data = [
      mockData.map((object) => {
        return object.impressions;
      }),
      mockData.map((object) => {
        return object.googleSpend;
      })
    ];

    chart.override = [
      {
        label: 'Impressions',
        yAxisID: 'impressions',
        type: 'line',
        lineTension: 0,
        borderWidth: 4,
        pointRadius: 0,
        fill: false
      },
      {
        label: 'Amount Spent',
        yAxisID: 'spend',
        stack: 'spend',
        backgroundColor: googleColor,
        hoverBackgroundColor: googleColor,
        hoverBorderColor: googleColor
      }
    ];

    chart.options = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
        position: 'bottom'
      },
      scales: {
        xAxes: [{
          display: true,
          stacked: true,
          gridLines: {
            display: false,
          },
          ticks: {
            callback: (dataLabel, index) => {
              if(mockData[index].event) {
                return '[' + filter('date')(dataLabel, 'MMM dd') + ']';
              }
              return filter('date')(dataLabel, 'MMM dd');
            }
          }
        }],
        yAxes: [
          {
            id: 'impressions',
            type: 'linear',
            beginAtZero: true,
            display: true,
            position: 'left',
            gridLines: {
              drawBorder: false,
              drawTicks: false
            }
          },
          {
            id: 'spend',
            type: 'linear',
            stacked: true,
            beginAtZero: true,
            display: true,
            position: 'right',
            gridLines: {
              drawBorder: false,
              drawTicks: false
            },
            ticks: {
              callback: (dataLabel) => {
                return filter('currency')(dataLabel);
              }
            }
          }
        ]
      },
      tooltips: {
        enabled: true,
        mode: 'single',
        callbacks: {
          title: (tooltipItem, data) => {
            let index = tooltipItem[0].index;
            return filter('date')(data.labels[index], 'longDate');
          },
          label: (tooltipItem, data) => {
            let index = tooltipItem.index;
            let impressions = data.datasets[0].data[index];
            let spend = filter('currency')(data.datasets[1].data[index]);
            let output = [
              `Impressions: ${impressions}`,
              `Amount Spent: ${spend}`
            ];
            if (mockData[index].event) {
              output.push(`CYCLE START/END`);
            }
            return output;
          }
        }
      }
    };
  }

  setDemographicChart() {
    let chart = this.demographicChart;
    let maleColor = '#f67002';
    let femaleColor = '#faa967';

    chart.data = [ [], [] ];
    chart.labels = ['13-17', '18-24', '24-34', '35-44', '45-54', '55-64', '65+'];

    for(let i = 1; i <= 7; i++) {
      chart.data[0].push(this.randomNumber(500));
      chart.data[1].push(this.randomNumber(500) * -1);
    }

    chart.override = [
      {
        label: 'Male',
        stack: 'gender',
        backgroundColor: maleColor,
        borderColor: maleColor
      },
      {
        label: 'Female',
        stack: 'gender',
        backgroundColor: femaleColor,
        borderColor: femaleColor
      }
    ];

    chart.options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          stacked: true,
          gridLines: {
            drawBorder: false
          },
          ticks: {
            callback: (dataLabel) => {
              return dataLabel < 0 ? dataLabel * -1 : dataLabel;
            }
          }
        }],
        yAxes: [{
          stacked: true,
          gridLines: {
            display: false
          }
        }]
      },
      tooltips: {
        enabled: true,
        mode: 'single',
        callbacks: {

          label: (tooltipItem, data) => {
            let index = tooltipItem.index;
            let male = data.datasets[0].data[index];
            let female = data.datasets[1].data[index] * -1;
            return [
              `Male: ${male}`,
              `Female: ${female}`
            ];
          }
        }
      }

    };
  }

  setDeviceChart() {
    let chart = this.deviceChart;
    let mobileColor = '#f67002';
    let desktopColor = '#faa967';

    let totalCount = 100;
    let desktopCount = this.randomNumber(totalCount);

    chart.data = [
      desktopCount,
      (totalCount - desktopCount)
    ];
    chart.labels = ['Desktop', 'Mobile'];

    chart.colors = [desktopColor, mobileColor];

    chart.override = {
      hoverBackgroundColor: chart.colors
    };

    chart.options = {
      responsive: true,
      maintainAspectRatio: false,
      cutoutPercentage: 80,
      tooltips: {
        enabled: false
      },
      elements: {
        center: {
          line1: '46,555',
          line1Padding: 50,
          line2: 'Impressions',
          line2Padding: 50,
          fontFamily: "'Roboto', sans-serif",
          fontColor: '#394354'
        }
      }
    };
  }

}

export default {
  template: template,
  controller: Controller,
  bindings: {
    campaignRequest: '<'
  }
};
