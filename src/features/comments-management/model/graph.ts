import * as baseModel from "../model";
import {combine, createEffect, createEvent, createStore, restore, sample} from "effector";
import type { StatusTags } from "../types";
import {backendAPI} from "shared/api/backend";

export const $startDate= createStore<Date>(new Date(2021, 8, 1));
export const $endDate= createStore<Date>(new Date());
export const startDateChanged = createEvent<Date>();
export const endDateChanged = createEvent<Date>();
$startDate.on(startDateChanged, (_, data) => data);
$endDate.on(endDateChanged, (_, data) => data);

export const filteredCommentsChanged = createEvent<any[]>();

export const $hoveredDate = createStore<string>("1.08.2021");
export const hoveredDateChanged = createEvent<string>();
$hoveredDate.on(hoveredDateChanged, (_, data) => data);

export const $dateToCommentsMap = combine(baseModel.$processedCommentsWithStatus, (processedCommentsWithStatus) => {
  const dateToCommentsMap: Record<string, any[]> = {};
  processedCommentsWithStatus.forEach(comment => {
    const date = new Date(Date.parse(comment.date_posted));
    const dateAsString = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
    if (dateToCommentsMap[dateAsString]){
      dateToCommentsMap[dateAsString].push(comment);
    } else {
      dateToCommentsMap[dateAsString] = [comment];
    }
  })
  return dateToCommentsMap;
})

export const $hoveredDateTagsGraphData = createStore<any>([]);

sample({
  clock: $hoveredDate,
  source: $dateToCommentsMap,
  fn: (dateToCommentsMap, hoveredDate) => {
    console.log(hoveredDate);
    console.log($dateToCommentsMap);
    const hoveredDateTagsGraphData = [];
    const statusTagsCount: Record<StatusTags, number> = {};
    const comments = dateToCommentsMap[hoveredDate];
    console.log(comments);
    if (comments) {
      comments.forEach((comment) => {
        const statusTags: StatusTags[] = comment.statusTags;
        statusTags.forEach((statusTag) => {
          if (statusTagsCount[statusTag]) {
            statusTagsCount[statusTag] += 1;
          } else {
            statusTagsCount[statusTag] = 1;
          }
        })
      })
    }
    Object.keys(statusTagsCount).forEach(name => {
      hoveredDateTagsGraphData.push({
        name: name,
        value: statusTagsCount[name],
      })
    })
    console.log(hoveredDateTagsGraphData)
    return hoveredDateTagsGraphData;
  },
  target: $hoveredDateTagsGraphData,
})


export const dataWithNegativeCommentsChanged = createEvent<any[]>();
export const $dataWithNegativeComments = restore(dataWithNegativeCommentsChanged,[]);

export const dataWithPositiveCommentsChanged = createEvent<any[]>();
export const $dataWithPositiveComments = restore(dataWithNegativeCommentsChanged,[]);

sample({
  source: [$startDate, $endDate, $dateToCommentsMap],
  fn: ([startDate, endDate, dateToCommentsMap]) => {
    const dataWithNegativeComments = [];
    let loop = new Date(startDate);
    while (loop <= endDate) {
      let date = loop.setDate(loop.getDate() + 1);
      const dateAsString = `${loop.getDate()}.${loop.getMonth()+1}.${loop.getFullYear()}`
      if (dateToCommentsMap[dateAsString]){
        let negativeCommentsCount = 0, positiveCommentsCount = 0;
        console.log(dateToCommentsMap[dateAsString]);
        dateToCommentsMap[dateAsString].forEach(comment => {
          if (comment.status === "NEGATIVE"){
            negativeCommentsCount++;
          } else {
            positiveCommentsCount++;
          }
        })
        console.log({
          date: dateAsString,
          negative: negativeCommentsCount,
          positive: positiveCommentsCount,
        });
        dataWithNegativeComments.push({
          date: dateAsString,
          negative: negativeCommentsCount,
          positive: positiveCommentsCount,
        })
      } else {
        dataWithNegativeComments.push({
          date: dateAsString,
          negative: 0,
          positive: 0,
        })
      }
      loop = new Date(date);
    }
    return dataWithNegativeComments;
  },
  target: dataWithNegativeCommentsChanged,
});









