import React, { useState } from "react"
import { Text, View, useToast } from 'native-base';
import DialogInput from 'react-native-dialog-input';
import { on } from '../../../tools'

const ModalBugOverview = (
    {
        state: {
            showModal,
            setShowModal,
        },
    }
) => {

    const toast = useToast();


    return (
    <DialogInput isDialogVisible={showModal}
                title={"Bug Alert"}
                message={"Please, describe your issue"}
                hintInput={"Report / Bug"}
                submitInput={ inputText => {
                    console.log("=== INPUT TEXT ===", inputText);
                    on.fpv.openReport({
                        toast
                    }, {
                        subject: "Bug Alert",
                        createdAt: Date.now(),
                        description: inputText
                    })
                    setShowModal(false)
                }}
                closeDialog={ () => setShowModal(false)}>
    </DialogInput>
    )
}

export default ModalBugOverview;
