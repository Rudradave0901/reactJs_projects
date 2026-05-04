import React from 'react'
import CommonBanner from '../components/CommonBanner'
import LatestNewsSection from '../components/LatestNewsSection'

const BlogPage = () => {
    return (
        <>
            <CommonBanner
                sectionTitle='Our'
                sectionTitleRed='Blog'
                currentPage='Blog'
                classForStyle=''
            />

            <LatestNewsSection
                sectionTitle="Our Foods"
                sectionTitleRed="News"
                limit={0}
            />
        </>
    )
}

export default BlogPage