import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal } from 'antd';

const ModalComponent = forwardRef((props: any, ref: any): JSX.Element => {
    const [visible, setVisible] = useState<boolean>(false);
    const [dataChildren, setDataChildren] = useState<JSX.Element>(<></>);

    useImperativeHandle(
        ref,
        () => ({
            setVisible,
            setDataChildren
        }),
    );

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <Modal
            title="Pokemon Detail"
            visible={visible}
            footer={null}
            destroyOnClose
            onCancel={handleCancel}
            width={1000}

        >
            {dataChildren}
        </Modal>
    );
});

export default ModalComponent;