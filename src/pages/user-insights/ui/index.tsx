import React, {useEffect} from 'react';
import {userModel} from "../../../entities/user";


type Props = {

}

export const UserInsights = (props: Props) => {

    useEffect(() => {
        userModel.effects.getUserPageIdFX();
    }, [])

    return <div>USER INSIGHTS PAGE</div>
}