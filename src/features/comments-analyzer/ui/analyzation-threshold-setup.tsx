import React, {FC} from "react";
import {Box, Button, Flex, Input, Text} from "@chakra-ui/react";
import {reflect} from "@effector/reflect";
import { commentsModel } from "entities/comments";
import * as model from "../model";

interface IViewProps {
    thresholds: commentsModel.Thresholds,
    onChangeInsultThreshold: (data: string) => void,
    onChangeIdentityHateThreshold: (data: string) => void,
    onChangeObsceneThreshold: (data: string) => void,
    onChangeSevereToxicThreshold: (data: string) => void,
    onChangeThreatThreshold: (data: string) => void,
    onChangeToxicThreshold: (data: string) => void,
}

const View: FC<IViewProps> = ({
    thresholds,
    onChangeIdentityHateThreshold,
    onChangeInsultThreshold,
    onChangeObsceneThreshold,
    onChangeSevereToxicThreshold,
    onChangeThreatThreshold,
    onChangeToxicThreshold
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
    },
});

