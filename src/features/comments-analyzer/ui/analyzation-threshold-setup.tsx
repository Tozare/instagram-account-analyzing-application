import React, {FC} from "react";
import {Box, Button, Flex, Input, Text, Select} from "@chakra-ui/react";
import {reflect} from "@effector/reflect";
import { commentsModel } from "entities/comments";
import { thresholdsModel } from "entities/thresholds";
import * as model from "../model";
import {thresholdsChanged} from "../model";
import * as config from "../config";

interface IViewProps {
  thresholds: commentsModel.Thresholds,
  onChangeInsultThreshold: (data: string) => void,
  onChangeIdentityHateThreshold: (data: string) => void,
  onChangeObsceneThreshold: (data: string) => void,
  onChangeSevereToxicThreshold: (data: string) => void,
  onChangeThreatThreshold: (data: string) => void,
  onChangeToxicThreshold: (data: string) => void,
  applyThresholds: () => void,
  onChangeThresholdsTemplate: (name: string) => void,
  thresholdsTemplate: string,
}

const View: FC<IViewProps> = ({
    thresholds,
    onChangeIdentityHateThreshold,
    onChangeInsultThreshold,
    onChangeObsceneThreshold,
    onChangeSevereToxicThreshold,
    onChangeThreatThreshold,
    onChangeToxicThreshold,
    applyThresholds,
  onChangeThresholdsTemplate,
                                thresholdsTemplate,
}) => {

    const {
        insultThreshold,
        identityHateThreshold,
        obsceneThreshold,
        severeToxicThreshold,
        threatThreshold,
        toxicThreshold
    } = thresholds;

    return (
        <Flex
            alignItems={"center"}
            width={"auto"}
            height={"auto"}
        >
            <Box
                height={"auto"}
                width={"auto"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
            >
                <Text
                    fontWeight={25}
                    fontSize={24}
                    marginBottom={"20px"}
                >
                    Threshold for negative comment
                </Text>
              <Select
                fontSize="12px"
                height="35px"
                marginBottom="10px"
                _focus={{
                  outline: "none",
                  boxShadow: `0px 0px 0px 1px gray inset`,
                  border: "0px",
                }}
                _hover={{}}
                border="0px"
                boxShadow={`0px 0px 0px 1px gray inset`}
                onChange={(e) => onChangeThresholdsTemplate(e.target.value as any)}
                value={thresholdsTemplate}
              >
                <option value="CUSTOM">custom</option>
                {
                  Object.keys(config.THRESHOLDS_TEMPLATES).map((key) => {
                    return <option value={key}>{key.toLowerCase()}</option>
                  })
                }
              </Select>

                <Box
                    width={"300px"}
                    height={"auto"}
                    marginBottom={"10px"}
                >
                    <Text>Insult</Text>
                    <Input
                        value={insultThreshold}
                        onChange={(e) => {
                            onChangeInsultThreshold(e.target.value);
                        }}
                        placeholder="enter threshold"
                    />
                </Box>
                <Box
                    width={"300px"}
                    height={"auto"}
                    marginBottom={"10px"}
                >
                    <Text>Toxic</Text>
                    <Input
                        value={toxicThreshold}
                        onChange={(e) => {
                            onChangeToxicThreshold(e.target.value);
                        }}
                        placeholder="enter threshold"
                    />
                </Box>
                <Box
                    width={"300px"}
                    height={"auto"}
                    marginBottom={"10px"}
                >
                    <Text>Threat</Text>
                    <Input
                        value={threatThreshold}
                        onChange={(e) => {
                            onChangeThreatThreshold(e.target.value);
                        }}
                        placeholder="enter threshold"
                    />
                </Box>
                <Box
                    width={"300px"}
                    height={"auto"}
                    marginBottom={"10px"}
                >
                    <Text>Obscene</Text>
                    <Input
                        value={obsceneThreshold}
                        onChange={(e) => {
                            onChangeObsceneThreshold(e.target.value);
                        }}
                        placeholder="enter threshold"
                    />
                </Box>
                <Box
                    width={"300px"}
                    height={"auto"}
                    marginBottom={"10px"}
                >
                    <Text>Severe toxic</Text>
                    <Input
                        value={severeToxicThreshold}
                        onChange={(e) => {
                            onChangeSevereToxicThreshold(e.target.value);
                        }}
                        placeholder="enter threshold"
                    />
                </Box>
                <Box
                    width={"300px"}
                    height={"auto"}
                >
                    <Text>Identity hate</Text>
                    <Input
                        value={identityHateThreshold}
                        onChange={(e) => {
                            onChangeIdentityHateThreshold(e.target.value);
                        }}
                        placeholder="enter threshold"
                    />
                </Box>
            </Box>
            <Box
                width={"auto"}
                height={"auto"}
                marginLeft={"70px"}
            >
                <Button
                    width={"200px"}
                    height={"45px"}
                    colorScheme='teal'
                    onClick={() => applyThresholds()}
                >
                    Apply
                </Button>
            </Box>
        </Flex>
    )
}


export const AnalyzationThresholdSetup = reflect({
    view: View,
    bind: {
      thresholds: model.$thresholds,
      onChangeInsultThreshold: model.insultThresholdChanged.prepend<string>((data) => parseFloat(data)),
      onChangeIdentityHateThreshold: model.identityHateThresholdChanged.prepend<string>((data) => parseFloat(data)),
      onChangeObsceneThreshold: model.obsceneThresholdChanged.prepend<string>((data) => parseFloat(data)),
      onChangeSevereToxicThreshold: model.severeToxicThresholdChanged.prepend<string>((data) => parseFloat(data)),
      onChangeThreatThreshold: model.threatThresholdChanged.prepend<string>((data) => parseFloat(data)),
      onChangeToxicThreshold: model.toxicThresholdChanged.prepend<string>((data) => parseFloat(data)),
      applyThresholds: model.thresholdsChanged,
      onChangeThresholdsTemplate: model.thresholdsTemplateChanged,
      thresholdsTemplate: model.$thresholdsTemplate,
    },
});

