const express = require('express')
const bodyParser = require('body-parser')
const PORT = 4000
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const UserRoutes = require('./routes/userRoutes')
const keys = require('./config/key')
const ProductRoutes = require('./routes/productRoutes')
const CartRoutes = require('./routes/cartRoutes')
const CustomerReviewRoutes = require('./routes/customerReviewRoutes')
const OrderedRoutes = require('./routes/orderedRoutes')
const RecentlyViewedRoutes = require('./routes/recentlyViewedRoutes')
const AbandonedCartRoutes = require('./routes/abandonedCartRoutes')
const OrderedHistoryRoutes = require('./routes/orderedHistoryRoutes')
const QuestionandanswerRoutes = require('./routes/questionandanswerRoutes')
const StoreReportRoutes = require('./routes/storereportRoutes')
const ConversationRoutes = require('./routes/conversationRoutes')
const cluster = require('cluster')
const os = require('os')
const ListingAndUpdateProductRoutes = require('./routes/listingAndUpdateProductRoutes')
const OrderedApprovalRoutes = require('./routes/orderedApprovalRoutes')
const SellerReviewRoute = require('./routes/sellerReviewRoutes')
const  NotificationRoutes =  require('./routes/notificationRoutes')
const BidSystemRoute = require('./routes/bidSystemRoutes')
const AuthRoutes = require('./routes/authRoutes')
const SubscriptionRoutes = require('./routes/subscriptionRoutes')
const AuctionlistingRoute = require('./routes/auctionListingRoutes')
const numberofcores = os.cpus().length
mongoose.connect(keys.URI, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if (error) {
        throw error
    } else {
        console.log("MongoDB Connected")
    }
})
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/',AuthRoutes)
app.use('/', UserRoutes)
app.use('/', ProductRoutes);
app.use('/', CartRoutes);
app.use('/', OrderedRoutes);
app.use('/', AbandonedCartRoutes);
app.use('/', OrderedHistoryRoutes);
app.use('/', RecentlyViewedRoutes);
app.use('/', CustomerReviewRoutes);
app.use('/', QuestionandanswerRoutes);
app.use('/', StoreReportRoutes);
app.use('/',ConversationRoutes)
app.use('/', OrderedApprovalRoutes)
app.use('/', ListingAndUpdateProductRoutes)
app.use('/',SellerReviewRoute)
app.use('/', NotificationRoutes)
app.use('/',BidSystemRoute)
app.use('/',SubscriptionRoutes)
app.use('/',AuctionlistingRoute)

const startserver = async()=>{
    try{
        app.listen(PORT, () => {
            console.log(`Server is Running on http://localhost:${PORT}`)
            console.log(`process id : ${process.pid}`)
        })
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

if(numberofcores > 1){
    if(cluster.isMaster){
        for(let i=0;i<numberofcores;i++){
            cluster.fork()
        }
    }else{
        startserver()
    }
}else{
    startserver()
}