import Head from 'next/head'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import Link from 'next/link'

export default function Home (props: any) {
  // console.log(props)
  const { posts } = props
  return (
    <div>
      <Head>
        <title>Nextjs demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <h1>Posts</h1>
        <main>
            <ul>
              {posts.map((item: any) => <li key={item.id}><Link href={`/detail/${item.id}`}>{item.title}</Link></li>)}
            </ul>
        </main>
    </div>
  )
}

// 此函数在构建时被调用
export const getStaticProps: GetStaticProps = async () => {
  // 调用外部 API 获取博文列表
  const res = await fetch('http://jsonplaceholder.typicode.com/posts')
  // console.log(res)
  const posts = await res.json()

  // 通过返回 { props: { posts } } 对象，Blog 组件
  // 在构建时将接收到 `posts` 参数
  return {
    props: {
      posts,
    },
  }
}
