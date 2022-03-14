import { Component, OnInit } from '@angular/core';
import { isSameDay, isSameMonth } from '../../shared/util/date.util';
import {
  PAYOUT_COLUMNS,
  PROFIT_COLUMNS,
  TABLE_COLUMNS,
  TABLE_DATA,
  TOTAL_COLUMNS,
} from './tournaments-table.config';
import { SummaryPeriod, TableColumn } from './tournaments-table.models';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-tournaments-table',
  templateUrl: './tournaments-table.component.html',
  styleUrls: ['./tournaments-table.component.scss'],
})
export class TournamentsTableComponent implements OnInit {
  tableColumns: TableColumn[] = TABLE_COLUMNS;
  totalColumns: TableColumn[] = TOTAL_COLUMNS;
  profitColumns = PROFIT_COLUMNS;
  payoutColumns = PAYOUT_COLUMNS;
  dataSource = this.getTableData(TABLE_DATA);

  get columnTitles() {
    return this.tableColumns.map((column) => column.columnTitle);
  }

  get displayedColumns() {
    return this.tableColumns.map((column) => column.columnProp);
  }

  get displayedTotalColumns() {
    return this.totalColumns.map((column) => column.columnProp);
  }

  get totalBuyins() {
    return this.dataSource
      .filter(this.notSummary)
      .reduce((total, dataItem) => (total += +dataItem.data.buyin), 0);
  }

  get totalRebuys() {
    return this.dataSource
      .filter(this.notSummary)
      .reduce((total, dataItem) => (total += +dataItem.data.rebuy), 0);
  }

  get totalAddons() {
    return this.dataSource
      .filter(this.notSummary)
      .reduce((total, dataItem) => (total += +dataItem.data.addon), 0);
  }

  get totalPayouts() {
    return this.dataSource
      .filter(this.notSummary)
      .reduce((total, dataItem) => (total += +dataItem.data.payout), 0);
  }

  get totalProfits() {
    return this.dataSource
      .filter(this.notSummary)
      .reduce((total, dataItem) => (total += +dataItem.data.profit), 0);
  }

  get totalPrizes() {
    return this.dataSource
      .filter(this.notSummary)
      .reduce((total, dataItem) => (total += +dataItem.data.prize), 0);
  }

  get totalBounties() {
    return this.dataSource
      .filter(this.notSummary)
      .reduce((total, dataItem) => (total += +dataItem.data.bounties), 0);
  }

  get totalSpent() {
    return +this.totalBuyins + +this.totalRebuys + +this.totalAddons;
  }

  constructor() {}

  ngOnInit(): void {}

  makeEditable(row: any) {
    if (!row.isDailySummary && !row.isMonthlySummary) {
      row.editable = !row.editable;
      console.log(row);
    }
  }

  getTableData(tableData: any[]) {
    tableData = tableData.map((data) => ({
      ...data,
      date: new Date(new Date(data.date).setHours(1)),
      payout: this.calculatePayout(data),
      profit: this.calculateProfit(data),
    }));
    const summaries = [];
    for (let i = 0; i < tableData.length; i++) {
      const currDate = tableData[i];
      const nextDate = tableData[i + 1];
      const d1 = new Date(currDate.date);
      const d2 = new Date(nextDate?.date);
      if (
        d1.setHours(0, 0, 0, 0) > d2.setHours(0, 0, 0, 0) ||
        i === tableData.length - 1
      ) {
        summaries.push(
          this.createSummary(currDate, tableData, SummaryPeriod.DAY, isSameDay)
        );
      }
      if (d1.getMonth() > d2.getMonth() || i === tableData.length - 1) {
        summaries.push(
          this.createSummary(
            currDate,
            tableData,
            SummaryPeriod.MONTH,
            isSameMonth
          )
        );
      }
    }
    console.log([...summaries, ...tableData]);
    return [...summaries, ...tableData]
      .map((item) => {
        const { isDailySummary, isMonthlySummary, ...data } = item;
        const mappedData = {
          data,
          isDailySummary,
          isMonthlySummary,
        };
        return mappedData;
      })
      .sort(this.sortTableData);
  }

  createSummary(
    currDate: any,
    tableData: any[],
    summaryPeriod: SummaryPeriod,
    filterFunction: (d1: Date, d2: Date) => boolean
  ) {
    const date = new Date(currDate.date);
    return {
      date: new Date(date).setHours(0, 0, 0, 0),
      tournamentName:
        (summaryPeriod === SummaryPeriod.DAY
          ? 'Daily'
          : currDate.date.toLocaleString('default', { month: 'long' })) +
        ' Summary',
      buyin: tableData
        .filter((d) => filterFunction(date as Date, new Date(d.date) as Date))
        .reduce(
          (a, b) =>
            (a += b.isDailySummary || b.isMonthlySummary ? 0 : +b.buyin),
          0
        ),
      rebuy: tableData
        .filter((d) => filterFunction(date as Date, new Date(d.date) as Date))
        .reduce(
          (a, b) =>
            (a += b.isDailySummary || b.isMonthlySummary ? 0 : +b.rebuy),
          0
        ),
      addon: tableData
        .filter((d) => filterFunction(date as Date, new Date(d.date) as Date))
        .reduce(
          (a, b) =>
            (a += b.isDailySummary || b.isMonthlySummary ? 0 : +b.addon),
          0
        ),
      prize: tableData
        .filter((d) => filterFunction(date as Date, new Date(d.date) as Date))
        .reduce(
          (a, b) =>
            (a += b.isDailySummary || b.isMonthlySummary ? 0 : +b.prize),
          0
        ),
      bounties: tableData
        .filter((d) => filterFunction(date as Date, new Date(d.date) as Date))
        .reduce(
          (a, b) =>
            (a += b.isDailySummary || b.isMonthlySummary ? 0 : +b.bounties),
          0
        ),
      payout: tableData
        .filter((d) => filterFunction(date as Date, new Date(d.date) as Date))
        .reduce(
          (a, b) =>
            (a += b.isDailySummary || b.isMonthlySummary ? 0 : +b.payout),
          0
        ),
      profit: tableData
        .filter((d) => filterFunction(date as Date, new Date(d.date) as Date))
        .reduce(
          (a, b) =>
            (a += b.isDailySummary || b.isMonthlySummary ? 0 : +b.profit),
          0
        ),
      isDailySummary: summaryPeriod === SummaryPeriod.DAY,
      isMonthlySummary: summaryPeriod === SummaryPeriod.MONTH,
    };
  }

  calculatePayout(data: any) {
    return +data.prize + +data.bounties;
  }

  calculateProfit(data: any) {
    return (
      this.calculatePayout(data) -
      (+data.buyin + +data.rebuy + +data.addon)
    ).toFixed(2);
  }

  private sortTableData(item1: any, item2: any) {
    return (
      new Date(item2.data.date).getTime() - new Date(item1.data.date).getTime()
    );
  }

  private notSummary(item: any) {
    return !item.isDailySummary && !item.isMonthlySummary;
  }
}
