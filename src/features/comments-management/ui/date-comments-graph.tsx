import React from "react";
import { reflect } from "@effector/reflect";
import {
  Box,
  Text,
  Input,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl, FormLabel, ModalFooter, Button, Spinner, Modal
} from "@chakra-ui/react";
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Cell, Pie, PieChart} from 'recharts';
import * as model from "../model";
import * as graphDataModel from "../model/graph";
import * as config from "../config";
import {$hoveredDateTagsGraphData, hoveredDateChanged} from "../model/graph";
import * as commentsManagementModel from "features/comments-management/model";

// const data = [
//   {name: 'Page A', uv: 400, pv: 2400, amt: 2400},
//   {name: 'Page B', uv: 600, pv: 2400, amt: 2400},
//   {name: 'Page C', uv: 400, pv: 2400, amt: 2400}
// ];

type Props = {
  data: any[],
  startDate: Date,
  endDate: Date,
  onChangeStartDate: (date: Date) => void,
  onChangeEndDate: (date: Date) => void,
  hoveredDateTagsGraphData: any[],
  onChangeHoveredDate: (date: string) => void,
}

const datapIE = [
  { name: 'INSULT', value: 400 },
  { name: 'HATE', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const DateCommentsGraphView = ({
  data,
  startDate,
  endDate,
  onChangeEndDate,
  onChangeStartDate,
  hoveredDateTagsGraphData,
  onChangeHoveredDate,
}: Props) => {

  // console.log(`${startDate.getDate()}.${startDate.getMonth()+1}.${startDate.getFullYear()}`);
  // console.log(`${endDate.getDate()}.${endDate.getMonth()+1}.${endDate.getFullYear()}`);

  const startDateAsString = `${startDate.getFullYear()}-${startDate.getMonth()+1 >= 10 ? "" : "0"}${startDate.getMonth()+1}-${startDate.getDate()+1 >= 10 ? "" : "0"}${startDate.getDate()}`;
  const endDateAsString = `${endDate.getFullYear()}-${endDate.getMonth()+1 >= 10 ? "" : "0"}${endDate.getMonth()+1}-${endDate.getDate()+1 >= 10 ? "" : "0"}${endDate.getDate()}`;

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
        Overview
      </Text>

      <Box
        display="flex"
        flexDirection="row"
        marginBottom="15px"
        width={"600px"}
      >
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
        >
          <Box>
            Start
          </Box>
          <Input
            type="date"
            value={startDateAsString}
            onChange={(e) => {
              const date = new Date(e.target.value);
              onChangeStartDate(date);
            }}
          />
        </Box>
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          marginLeft="25px"
        >
          <Box>
            End
          </Box>
          <Input
            type="date"
            value={endDateAsString}
            onChange={(e) => {
              const date = new Date(e.target.value);
              onChangeEndDate(date);
            }}
          />
        </Box>
      </Box>

      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Box
          // backgroundColor={"green"}
          width={"600px"}
          height={"400px"}
          overflow={"scroll"}
          // position={"relative"}
        >
          <LineChart
            width={1400}
            height={400}
            data={data}
            onMouseOver={(e) => {
              onChangeHoveredDate(e.activeLabel);
            }}
          >
            <Line type="monotone" dataKey="negative" stroke="#FFCCCC" dot={false}/>
            <Line type="monotone" dataKey="positive" stroke="#8ecc8e" dot={false}/>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date"/>
            <YAxis
              orientation="right"

            />
            <Tooltip />
            <Legend />
          </LineChart>
        </Box>
        <Box
          marginLeft="30px"
        >
          {
            hoveredDateTagsGraphData.length === 0 ?
              (
                <Box
                  width={"300px"}
                  height="300px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="10px"
                  backgroundColor="#ECF0F1"
                  padding={"20px"}
                >
                  <Box>
                    No comments at this date
                  </Box>
                </Box>
              ) : (
                <PieChart width={300} height={300}>
                  <Pie
                    data = {hoveredDateTagsGraphData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    labelLine={false}
                    // label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {hoveredDateTagsGraphData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={config.GRAPH_STATUS_TAGS_COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              )
          }
        </Box>
      </Box>
    </Box>
  )
}

export const DateCommentGraph = reflect({
  view: DateCommentsGraphView,
  bind: {
    data: graphDataModel.$dataWithNegativeComments,
    startDate: graphDataModel.$startDate,
    endDate: graphDataModel.$endDate,
    onChangeStartDate: graphDataModel.startDateChanged,
    onChangeEndDate: graphDataModel.endDateChanged,
    hoveredDateTagsGraphData: graphDataModel.$hoveredDateTagsGraphData,
    onChangeHoveredDate: graphDataModel.hoveredDateChanged,
  },
})
