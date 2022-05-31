import * as baseModel from "../model";
import {combine, createEffect, createEvent, createStore, restore, sample} from "effector";
import type { StatusTags } from "../types";

export const filteredCommentsChanged = createEvent<any[]>();

export const $hoveredDate = createStore<string>("1.08.2021");
export const hoveredDateChanged = createEvent<string>();
$hoveredDate.on(hoveredDateChanged, (_, data) => data);

export const $idToCommentMap = combine(baseModel.$processedCommentsWithStatus, (processedCommentsWithStatus) => {
  const idToCommentMap: Record<string, any[]> = {};
  processedCommentsWithStatus.forEach(comment => {
    idToCommentMap[comment.id] = comment;
  })
  return idToCommentMap;
})

export const clusteringCommentsDataChanged = createEvent<any[]>();
export const $clusteringCommentsData = restore(clusteringCommentsDataChanged,[]);

export const isRectangleSelectionChanged = createEvent<boolean>();
export const $isRectangleSelection = restore(isRectangleSelectionChanged,false);
export const rectangleSelectionRectChanged = createEvent<{ x1: number, y1: number, x2: number, y2: number }>();
export const $rectangleSelectionRect = restore(rectangleSelectionRectChanged,{x1: 0, x2: 0, y1: 0, y2: 0});
export const selectedCommentsChanged = createEvent<Record<string, boolean>>();
export const $selectedComments = restore(selectedCommentsChanged, {});

sample({
  clock: baseModel.$processedCommentsWithStatus,
  source: [$idToCommentMap],
  fn: ([idToCommentMap], processedCommentsWithStatus) => {

    const clusteringCommentsData = [];
    const comments = [];

    processedCommentsWithStatus.forEach((comment) => {
      clusteringCommentsData.push({
        status: comment.status,
        id: comment.id,
        text: comment.text,
        x: comment.x || 0,
        y: comment.y || 0,
      })
    })


    return clusteringCommentsData;
  },
  target: clusteringCommentsDataChanged,
})

export const commentsSelected = createEvent<{ x1: number, y1: number, x2: number, y2: number }>();

sample({
  clock: commentsSelected,
  source: $clusteringCommentsData,
  fn: (clusteringCommentsData: any[], { x1, x2, y1, y2 }) => {
    const selectedComments: Record<string, boolean> = {};
    clusteringCommentsData.forEach((comment) => {
      if (
        x1 <= comment.x
        && x2 >= comment.x
        && y1 >= comment.y
        && y2 <= comment.y
      ) {
        selectedComments[comment.id] = true;
      }
    })
    return selectedComments;
  },
  target: [
    selectedCommentsChanged,
  ],
});

$rectangleSelectionRect.reset(selectedCommentsChanged);





