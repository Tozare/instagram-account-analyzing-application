import React, {useRef, useState} from "react";
import { reflect } from "@effector/reflect";
import {
  Box,
  Text,
  Input,
  Button,
  Spinner,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter, Modal, useToast,
} from "@chakra-ui/react";
import {Scatter, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Cell, Pie, PieChart, ReferenceArea, ScatterChart} from 'recharts';
import * as model from "../model";
import * as clusterGraphDataModel from "../model/cluster-graph";
import * as config from "../config";
import {$hoveredDateTagsGraphData, hoveredDateChanged} from "../model/graph";
import {mediaModel} from "entities/media";
import * as commentsManagementModel from "features/comments-management/model";


// const data = [
//   {name: 'Page A', uv: 400, pv: 2400, amt: 2400},
//   {name: 'Page B', uv: 600, pv: 2400, amt: 2400},
//   {name: 'Page C', uv: 400, pv: 2400, amt: 2400}
// ];

type Props = {
  data: any,
  onSelectComments: (data: { x1: number, y1: number, x2: number, y2: number } ) => void,
  onChangeSelectionRect: (data: { x1: number, y1: number, x2: number, y2: number } ) => void,
  onChangeSelectionAvailability: (data: boolean) => void,
  isRectangleSelectionAvailable: boolean,
  rectangleSelectionRect: { x1: number, y1: number, x2: number, y2: number },
  selectedComments: Record<string, boolean>,

  isReplyCommentModalOpen: boolean,
  replyCommentText: string,
  setIsReplyCommentModalOpen: (data: boolean) => void,
  setReplyText: (data: string) => void,

}

const datapIE = [
  { name: 'INSULT', value: 400 },
  { name: 'HATE', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const CustomTooltip = ({ active, payload, label }) => {
  console.log(payload);
  if (active && payload && payload.length) {
    return (
      <Box
        borderRadius="5px"
        border="1px solid black"
        padding="4px"
      >
        <Box>{payload[0].payload.text}</Box>
      </Box>
    );
  }

  return null;
};


const ClusterCommentsGraphView = ({
  data,
  onSelectComments,
  onChangeSelectionRect,
  onChangeSelectionAvailability,
  isRectangleSelectionAvailable,
  rectangleSelectionRect,
  selectedComments,

  isReplyCommentModalOpen,
  replyCommentText,
  setIsReplyCommentModalOpen,
  setReplyText,

}: Props) => {

  const toast = useToast()
  const [loadingState, setLoadingState] = useState("NONE");

  return (
    <Box
      width={"100%"}
      height={"100%"}
      backgroundColor={"#FFFFFF"}
      padding={"15px"}
      borderRadius={"8px"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Text
        marginTop="10px"
        marginBottom="10px"
        fontWeight={600}
        fontSize={16}
        marginLeft="auto"
        marginRight="auto"
      >
        Clustered comments graph
      </Text>

      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Box
          // backgroundColor={"green"}
          width={"800px"}
          height={"600px"}
          overflow={"scroll"}
          // position={"relative"}
        >
          <ScatterChart
            width={800}
            height={600}
            margin={{ top: 50 }}
            onMouseDown={(e) => {
              onChangeSelectionAvailability(true);
              const { chartX, chartY, xValue, yValue } = e || {};
              // const clickedPoint = getClickedPoint(chartX, chartY, filteredData);
              onChangeSelectionRect({ x1: xValue, y1: yValue, x2: xValue, y2: yValue });
            }}
            onMouseMove={(e) => {
              if (isRectangleSelectionAvailable) {
                const { chartX, chartY, xValue, yValue } = e || {};
                onChangeSelectionRect({
                  x1: rectangleSelectionRect.x1,
                  y1: rectangleSelectionRect.y1,
                  x2: xValue,
                  y2: yValue,
                });
              }
            }}
            onMouseUp={(e) => {
              onChangeSelectionAvailability(false);
              onSelectComments(rectangleSelectionRect);
            }}
          >
            <XAxis
              type="number"
              dataKey="x"
            />
            <YAxis
              type="number"
              dataKey="y"
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />}/>
            {isRectangleSelectionAvailable && (
              <ReferenceArea
                x1={rectangleSelectionRect.x1}
                x2={rectangleSelectionRect.x2}
                y1={rectangleSelectionRect.y1}
                y2={rectangleSelectionRect.y2}
              />
            )}
            <Scatter name="A school" data={data} fill="#8884d8">
              {data.map((entry, index) => {
                // console.log(entry);
                // console.log(selectedComments[entry.id]);
                const isSelected = selectedComments[entry.id];
                let status = isSelected ? "SELECTED": entry.status;
                return <Cell key={entry.id} fill={config.COMMENT_STATUS_COLORS[status]} strokeWidth = {isSelected ? 2 : 0}/>
              })}
            </Scatter>
          </ScatterChart>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box
            marginBottom="20px"
          >
            <Button
              width={"150px"}
              height={"38px"}
              backgroundColor={"#8ecc8e"}
              onClick={() => {
                setIsReplyCommentModalOpen(true);
              }}
            >
              Reply
            </Button>
          </Box>

          <Button
            width={"150px"}
            height={"38px"}
            marginBottom="20px"
            onClick={() => {
              setLoadingState("DELETION");
              mediaModel.deleteSelectedPostCommentsFx({
                selectedPostComments: selectedComments,
              }).then(() => {
                toast({
                  title: "Comments were deleted",
                  description: "Selected comments of the post-analysis were successfully deleted",
                  status: "success",
                  duration: 4500,
                  isClosable: true,
                });
                setLoadingState("NONE");
              });
            }}
          >
            {
              loadingState === "DELETION"
                ? <div>
                  <Spinner/>
                </div>
                : <div>Spam</div>
            }
          </Button>

          <Button
            width={"150px"}
            height={"38px"}
            backgroundColor={"#FFCCCC"}
            onClick={() => {
              setLoadingState("DELETION");
              mediaModel.deleteSelectedPostCommentsFx({
                selectedPostComments: selectedComments,
              }).then(() => {
                toast({
                  title: "Comments were deleted",
                  description: "Selected comments of the post-analysis were successfully deleted",
                  status: "success",
                  duration: 4500,
                  isClosable: true,
                });
                setLoadingState("NONE");
              });
            }}
          >
            {
              loadingState === "DELETION"
                ? <div>
                  <Spinner/>
                </div>
                : <div>Delete</div>
            }
          </Button>
        </Box>
      </Box>

      <Modal
        isOpen={isReplyCommentModalOpen}
        onClose={() => {
          setIsReplyCommentModalOpen(false);
        }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reply to comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>
                Reply message
              </FormLabel>
              <Input
                value={replyCommentText}
                onChange={(e) => {
                  setReplyText(e.target.value);
                }}
                placeholder="Reply message"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="green"
              onClick={() => {
                setLoadingState("REPLYING");
                commentsManagementModel.replyCommentFx({
                  replyText: replyCommentText,
                  selectedPostComments: selectedComments,
                }).then(() => {
                  toast({
                    title: "Comments were replied",
                    description: "Replies will be sent successfully",
                    status: "success",
                    duration: 4500,
                    isClosable: true,
                  })
                  setLoadingState("NONE");
                });
              }}
            >
              {loadingState === "REPLYING" ? <div><Spinner/></div> : <div>Reply</div>}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export const ClusterCommentsGraph = reflect({
  view: ClusterCommentsGraphView,
  bind: {
    data: clusterGraphDataModel.$clusteringCommentsData,
    onSelectComments: clusterGraphDataModel.commentsSelected,
    onChangeSelectionRect: clusterGraphDataModel.rectangleSelectionRectChanged,
    onChangeSelectionAvailability: clusterGraphDataModel.isRectangleSelectionChanged,
    isRectangleSelectionAvailable: clusterGraphDataModel.$isRectangleSelection,
    rectangleSelectionRect: clusterGraphDataModel.$rectangleSelectionRect,
    selectedComments: clusterGraphDataModel.$selectedComments,

    isReplyCommentModalOpen: commentsManagementModel.$isReplyCommentModalOpen,
    replyCommentText: commentsManagementModel.$replyText,
    setIsReplyCommentModalOpen: commentsManagementModel.isReplyCommentModalChanged,
    setReplyText: commentsManagementModel.replyTextChanged,

  },
});



// export default function CustomDot(props) {
//   const { cx, cy, payload, selectedPoint } = props;
//   const isSelected =
//     selectedPoint.x === payload.x && selectedPoint.y === payload.y;
//
//   return (
//     <g
//       className="custom-dot"
//       data-chart-x={cx}
//       data-chart-y={cy}
//       data-x-value={payload.x}
//       data-y-value={payload.y}
//       data-radius={isSelected ? RADIUS_UNSELECTED : RADIUS_SELECTED}
//     >
//       {!isSelected ? (
//         <circle cx={cx} cy={cy} r={RADIUS_UNSELECTED} fill={COLOR_UNSELECTED} />
//       ) : (
//         <>
//           <circle
//             cx={cx}
//             cy={cy}
//             r={RADIUS_SELECTED / 2}
//             fill={COLOR_SELECTED}
//           />
//           <circle
//             cx={cx}
//             cy={cy}
//             r={RADIUS_SELECTED}
//             fill="none"
//             stroke={COLOR_SELECTED}
//           />
//         </>
//       )}
//     </g>
//   );
// }

