import { Component } from "@angular/core";
import { SeriesLabels } from "@progress/kendo-angular-charts";
import { enginePerformance } from "./data";

@Component({
  selector: "my-app",
  template: `
    <kendo-chart
      [title]="{ text: 'Average Weather Conditions' }"
      (seriesClick)="onSeriesClick($event)"
    >
      <kendo-chart-y-axis>
        <kendo-chart-y-axis-item [title]="{ text: 'Power (bhp)' }">
        </kendo-chart-y-axis-item>
        <kendo-chart-y-axis-item
          name="torque"
          [title]="{ text: 'Torque (lb-ft)' }"
        >
        </kendo-chart-y-axis-item>
      </kendo-chart-y-axis>

      <kendo-chart-x-axis>
        <kendo-chart-x-axis-item
          [axisCrossingValue]="crossingValues"
          [title]="{ text: 'Engine rpm' }"
          [labels]="{ format: 'n0' }"
        >
        </kendo-chart-x-axis-item>
      </kendo-chart-x-axis>

      <kendo-chart-series>
        <kendo-chart-series-item
          *ngFor="let item of series"
          type="scatterLine"
          [name]="item.name"
          [data]="item.data"
          [xField]="item.xField"
          [yField]="item.yField"
          [tooltip]="item.tooltip"
          [yAxis]="item.yAxis"
        >
        </kendo-chart-series-item>
      </kendo-chart-series>
      <kendo-chart-series>
        <kendo-chart-series-item
          type="rangeColumn"
          [data]="weatherData"
          fromField="min"
          toField="max"
          categoryField="month"
          [labels]="seriesLabels2"
        >
          <kendo-chart-series-item-labels-from [content]="labelContentFrom">
          </kendo-chart-series-item-labels-from>
          <kendo-chart-series-item-labels-to [content]="labelContentTo">
          </kendo-chart-series-item-labels-to>
        </kendo-chart-series-item>
        <kendo-chart-series-item
          [data]="seriesData"
          type="line"
          [labels]="seriesLabels"
        >
        </kendo-chart-series-item>
      </kendo-chart-series>
      <kendo-chart-category-axis>
        <kendo-chart-category-axis-item [labels]="{ rotation: 'auto' }">
        </kendo-chart-category-axis-item>
      </kendo-chart-category-axis>
    </kendo-chart>
  `
})
export class AppComponent {
  public weatherData = [
    { month: "1", min: 5, max: 11 },
    { month: "2", min: 5, max: 13 },
    { month: "3", min: 7, max: 15 },
    { month: "4", min: 10, max: 19 }
  ];
  public crossingValues: number[] = [0, 10];
  public seriesData: number[] = [20, 40, 45, 30];
  public series: any[] = [
    {
      name: "Power",
      data: enginePerformance,
      xField: "rpm",
      yField: "power",
      tooltip: {
        format: "{1} bhp @ {0:N0} rpm"
      }
    },
    {
      name: "Torque",
      data: enginePerformance,
      xField: "rpm",
      yField: "torque",
      yAxis: "torque",
      tooltip: {
        format: "{1} lb-ft @ {0:N0} rpm"
      }
    }
  ];

  public seriesLabels: SeriesLabels = {
    visible: true, // Note that visible defaults to false
    padding: 3,
    font: "bold 8px Arial, sans-serif"
  };

  public seriesLabels2: SeriesLabels = {
    visible: true, // Note that visible defaults to false
    padding: 3,
    font: "bold 10px Arial, sans-serif"
  };

  onSeriesClick = event => {
    console.log(event);
  };

  public labelContentFrom(e: any): string {
    return `${e.value.from}`;
  }

  public labelContentTo(e: any): string {
    return `${e.value.to}`;
  }
}
