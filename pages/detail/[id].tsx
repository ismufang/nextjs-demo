import React from 'react'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

export default function Detail({ post }: any) {
    // console.log(post)
    return (
        <div>
            <Head>
                <title>Nextjs-{post.title}</title>
            </Head>
            <h1>{post.title}</h1>
            <main> 
                <p>{post.body}</p>
            </main>
        </div>
    )
}

// 在构建时也会被调用
export const getStaticProps: GetStaticProps = async ({ params }) => {
    // params 包含此片博文的 `id` 信息。
    // 如果路由是 /posts/1，那么 params.id 就是 1
    const res = await fetch(`http://jsonplaceholder.typicode.com/posts/${params.id}`)
    const post = await res.json()
  
    // 通过 props 参数向页面传递博文的数据
    return { props: { post } }
  }


// 此函数在构建时被调用
export const getStaticPaths: GetStaticPaths =  async () => {
    // 调用外部 API 获取博文列表
    const res = await fetch('http://jsonplaceholder.typicode.com/posts')
    const posts = await res.json()

    // 根据博文列表生成所有需要预渲染的路径
    const paths = posts.map((post) => `/detail/${post.id}`)

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}