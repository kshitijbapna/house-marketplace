import {React,useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import {collection,getDocs,query,where,orderBy,limit,startAfter} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

function Category() {
    const [listings,setListings]=useState(null)
    const [loading,setLoading]=useState(true)
    const [lastFetchedListing,setLastFetchedListing]=useState(null)
    const params =useParams()
    
    useEffect(()=>{
        const fetchListings=async ()=>{
            try{
                const listingsRef=collection(db,'listings')
                //query
                const q=query(
                    listingsRef,
                    where('type','==',params.categoryName),
                    orderBy('timestamp','desc'),
                    limit(10)
                )
                const querySnap=await getDocs(q)
                
                const lastVisible=querySnap.docs[querySnap.docs.length-1]
                setLastFetchedListing(lastVisible)
                
                let listings=[]
                querySnap.forEach((doc)=>{
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                setListings(listings)
                setLoading(false)
            }
            catch(err){
                toast.error("Couldn't fetch Listings")
                console.log(err);
            }
        }
        fetchListings()
    },[params.categoryName])

    //pagination/loadmore

    const onFetchMoreListings=async ()=>{
        try{
            const listingsRef=collection(db,'listings')
            //query
            const q=query(
                listingsRef,
                where('type','==',params.categoryName),
                orderBy('timestamp','desc'),
                startAfter(lastFetchedListing),
                limit(10)
            )
            const querySnap=await getDocs(q)
            
            const lastVisible=querySnap.docs[querySnap.docs.length-1]
            setLastFetchedListing(lastVisible)
            
            let listings=[]
            querySnap.forEach((doc)=>{
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            setListings((prevState)=>[...prevState,...listings])
            setLoading(false)
        }
        catch(err){
            toast.error("Couldn't fetch Listings")
            console.log(err);
        }
    }

  return (
    <div className='category'>
        <header>
            <p className='pageHeader'>
                {params.categoryName==='rent'?'Places for Rent':'Places for Sale'}
            </p>
        </header>
        {loading?<Spinner />:listings&&listings.length>0?
        <>
            <main>
                <ul className='category'>
                    {listings.map((listing)=>(
                        <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
                    ))}
                </ul>
            </main>

            <br />
            <br />
            {lastFetchedListing&&(
                <p className='loadMore' onClick={onFetchMoreListings}>
                    Load More
                </p>
            )}

        </>:<p>No Listings</p>}
    </div>
  )
}

export default Category