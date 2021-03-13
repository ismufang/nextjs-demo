// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import store from './store';

export default (req, res) => {
    if (req.method === 'POST') {
        // Process a POST request
        const list = JSON.parse(req.body)
        // console.log(list)
        store.urls.push(list)
    }
    
    res.status(200).json({ msg: 'success'})
}
  