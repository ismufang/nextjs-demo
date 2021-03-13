import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../styles/search.module.css'
import { Button, Modal, Form, Input, Image, message } from 'antd'

const UrlList = [
    {
        title: '百度',
        url: 'https://baidu.com',
        imgUrl: 'https://baidu.com/favicon.ico'
    },
    {
        title: '百度',
        url: 'https://baidu.com',
        imgUrl: 'https://baidu.com/favicon.ico'
    },
    {
        title: '百度',
        url: 'https://baidu.com',
        imgUrl: 'https://baidu.com/favicon.ico'
    }
]

let StorageUrlList = []
if (process.browser) {
    // Client-side-only code
    StorageUrlList = JSON.parse((window.localStorage as any).getItem('urlList') || '[]')
}

export default function Search() {
    const [urlList, setUrlList] = useState<any[]>(StorageUrlList)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    }

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    }

    const tailLayout = {
        wrapperCol: { offset: 20, span: 4 },
    }

    const handleOk = () => {
        setIsModalVisible(false);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    function getHost(url){
        let domain = url.split('/')
        let host = ''
        if (domain[2]) {
            const protocol = domain[0]
            domain = domain[2]
            host = `${protocol}//${domain}`
        }
        return host
    }

    const onFinish = (values: any) => {
        console.log('Success:', values);
        var host = getHost(values.url)
        if (host) {
            const data = {
                ...values,
                imgUrl: `${host}/favicon.ico`
            }
            const list: any[] = [...urlList, data]
            setUrlList(list)
            localStorage.setItem('urlList', JSON.stringify(list))
            setIsModalVisible(false)
        } else {
            message.error('无效url')
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }
    
    return (
        <div className={styles.container}>
            <h1>search</h1>
            <input />
            <div className={styles.urlList}>
                {urlList.map((item: any, index: number) => <div key={index} className={styles.urlListItem}><Link href={item.url}><Image
                    src={item.imgUrl}
                    alt={item.title}
                    title={item.title}
                    className={styles.urlImg}
                    preview={false}
                /></Link></div>)}
            </div>
            <Button onClick={showModal}>+add</Button>
            <Modal title="添加快捷方式" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={false}>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >
                <Form.Item
                    label="网址名"
                    name="title"
                    rules={[{ required: true, message: '请输入网址名' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="网址URL"
                    name="url"
                    rules={[{ required: true, message: '请输入url' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">确定</Button>
                </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
