import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../styles/search.module.css'
import { Button, Modal, Form, Input, Image, message, Typography } from 'antd'
import { useRouter } from 'next/router'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

const { Text, Title } = Typography

let StorageUrlList = []
// if (process.browser) {
//     // Client-side-only code
//     StorageUrlList = JSON.parse((window.localStorage as any).getItem('urlList') || '[]')
// }

export default function Search(props: any) {
    // console.log(props.urls)
    const router = useRouter()
    const [urlList, setUrlList] = useState<any[]>(StorageUrlList)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const showModal = () => {
        setIsModalVisible(true);
    }

    const getData = async () => {
      const res = await fetch('/api/urls')
      const urls = await res.json()
      console.log(urls)
      setUrlList(urls)
    }

    useEffect(() => {
      getData()
    }, [])

    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
    }

    const tailLayout = {
        wrapperCol: { offset: 14, span: 10 },
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

    const onFinish = async (values: any) => {
        // console.log('Success:', values);
        var host = getHost(values.url)
        if (host) {
            const data = {
                ...values,
                imgUrl: `${host}/favicon.ico`
            }
            await fetch('/api/addUrl', {
              method: 'post',
              body: JSON.stringify(data)
            })

            await getData()
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
            <Image
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                width={300}
                preview={false}
                style={{
                    marginBottom: 30,
                }}
             />
            <Input.Search
                size="large"
                placeholder="请输入内容"
                onSearch={(value: string) => {
                    console.log(value)
                    router.push('/posts')
                }}
                style={{
                    marginBottom: 10,
                }}
             />
            <div className={styles.urlList}>
                {urlList.map((item: any, index: number) => <div key={index} className={styles.urlListItem}>
                    <div className={styles.imgBox}>
                        <Link href={item.url}>
                            <Image
                                src={item.imgUrl}
                                alt={item.title}
                                title={item.title}
                                className={styles.urlImg}
                                preview={false}
                                fallback="/imgs/nopic.png"
                            />
                        </Link>
                    </div>
                    <Text ellipsis style={{ width: 100, fontSize: 12, textAlign: 'center' }}>{item.title}</Text>
                </div>)}
                <div className={styles.urlListItem} onClick={showModal}>
                    <div className={styles.imgBox}>+</div>
                    <Text ellipsis style={{ width: 100, fontSize: 12, textAlign: 'center' }}>添加快捷方式</Text>
                </div>
            </div>
            <Modal 
                title="添加快捷方式" 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
                width={400}
                footer={false}>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >
                <Form.Item
                    label="名称"
                    name="title"
                    rules={[{ required: true, message: '请输入网址名' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="网址"
                    name="url"
                    rules={[{ required: true, message: '请输入url' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button onClick={handleCancel} style={{ marginRight: 8 }}>取消</Button>
                    <Button type="primary" htmlType="submit">确定</Button>
                </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
