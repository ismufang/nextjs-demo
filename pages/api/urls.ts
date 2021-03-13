// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const urls = [
    {
        title: '百度',
        url: 'https://baidu.com',
        imgUrl: 'https://baidu.com/favicon.ico'
    },
    {
        title: '谷歌',
        url: 'https://google.com',
        imgUrl: 'https://google.com/favicon.ico'
    }
]
import store from './store'
export default (req, res) => {
    res.status(200).json(store.urls)
}
  