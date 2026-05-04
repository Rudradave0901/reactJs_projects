import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../components/Container'
import CommonBanner from '../components/CommonBanner'
import { getMealById, getMeals } from '../api/themealdb'

const BlogDetails = () => {
    const { mealId } = useParams()
    const [blog, setBlog] = useState(null)
    const [isBlogLoading, setIsBlogLoading] = useState(true)
    const [blogError, setBlogError] = useState('')
    const [comments, setComments] = useState([])
    const [isCommentsLoading, setIsCommentsLoading] = useState(true)
    const [commentsError, setCommentsError] = useState('')

    useEffect(() => {
        const controller = new AbortController()

        const loadBlog = async () => {
            setIsBlogLoading(true)
            setBlogError('')

            try {
                const selectedBlog = mealId
                    ? await getMealById(mealId, controller.signal)
                    : (await getMeals('all', 1, controller.signal))[0]

                setBlog(selectedBlog)
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setBlogError('Blog detail load thata problem aavyo. Please thodi vaar pachi try karo.')
                    setBlog(null)
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsBlogLoading(false)
                }
            }
        }

        loadBlog()

        return () => controller.abort()
    }, [mealId])

    useEffect(() => {
        const controller = new AbortController()
        const postId = mealId ? (Number(mealId.slice(-2)) % 10) + 1 : 1

        const loadComments = async () => {
            setIsCommentsLoading(true)
            setCommentsError('')

            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`, {
                    signal: controller.signal,
                })

                if (!response.ok) {
                    throw new Error('Unable to load comments.')
                }

                const data = await response.json()
                const formattedComments = data.slice(0, 5).map((comment, index) => ({
                    id: comment.id,
                    user: comment.name
                        .split(' ')
                        .slice(0, 2)
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' '),
                    date: 'March 10, 2023',
                    image: `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.email)}&background=E60000&color=fff`,
                    level: index === 1 ? 2 : index === 2 ? 3 : 1,
                    content: comment.body,
                }))

                setComments(formattedComments)
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setCommentsError('Comments load thata problem aavyo. Please thodi vaar pachi try karo.')
                    setComments([])
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsCommentsLoading(false)
                }
            }
        }

        loadComments()

        return () => controller.abort()
    }, [mealId])

    return (
        <>
            <CommonBanner
                sectionTitle='Blog'
                sectionTitleRed='Details'
                currentPage='Blog Details'
                classForStyle=''
            />

            <section className="blog-detail-section py-10 lg:pt-[50px] lg:pb-[70px]">
                <Container>
                    <div className="flex flex-wrap justify-center -mx-4">
                        <div className="w-full px-4">
                            <div className="blog-detail-container max-w-[1030px] mx-auto">
                                <div className="blog-detail-content-wrap">
                                    {isBlogLoading && (
                                        <div className="text-center text-[18px] text-[#636363] mb-8">
                                            Loading blog details...
                                        </div>
                                    )}
                                    {!isBlogLoading && blogError && (
                                        <div className="text-center text-[18px] text-[#E60000] mb-8">
                                            {blogError}
                                        </div>
                                    )}
                                    {!isBlogLoading && blog && (
                                        <>
                                    <h2 className="section-title text-[24px] md:text-[30px] mb-[20px]">{blog.title}</h2>
                                    <ul className="blog-details-meta flex items-center mb-[20px] flex-wrap gap-y-3">
                                        <li>
                                            <a href="#" className="flex items-center text-[14px] md:text-[16px] font-light leading-none text-[#131313] tracking-[0.2px] mr-4 md:mr-[50px]">
                                                <svg className="mr-[10px]" width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M15.2222 2.8H2.77778C1.79594 2.8 1 3.60589 1 4.6V17.2C1 18.1941 1.79594 19 2.77778 19H15.2222C16.2041 19 17 18.1941 17 17.2V4.6C17 3.60589 16.2041 2.8 15.2222 2.8Z" stroke="#E60000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M12.5547 1V4.6" stroke="#E60000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M5.44531 1V4.6" stroke="#E60000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M1 8.2H17" stroke="#E60000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>
                                                March 12, 2023
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center text-[14px] md:text-[16px] font-light leading-none text-[#131313] tracking-[0.2px] mr-4 md:mr-[50px]">
                                                <svg className="mr-[10px]" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M17 8.55557C17.003 9.72878 16.7289 10.8861 16.2 11.9333C15.5728 13.1882 14.6086 14.2437 13.4155 14.9816C12.2223 15.7195 10.8473 16.1106 9.44443 16.1111C8.27122 16.1142 7.11387 15.8401 6.06666 15.3111L1 17L2.68889 11.9333C2.15994 10.8861 1.88583 9.72878 1.88889 8.55557C1.88943 7.15269 2.28054 5.77766 3.01841 4.58451C3.75629 3.39135 4.81178 2.42719 6.06666 1.80002C7.11387 1.27107 8.27122 0.996966 9.44443 1.00003H9.88887C11.7416 1.10224 13.4916 1.88426 14.8037 3.19634C16.1157 4.50843 16.8978 6.25837 17 8.11113V8.55557Z" stroke="#E60000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>
                                                Comments({comments.length})
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="blog-detail-feature-image mb-6 lg:mb-8 rounded-[20px] overflow-hidden">
                                        <img src={blog.image} alt={blog.title} className="w-full max-h-[520px] object-cover" width="1030" height="350" />
                                    </div>
                                    {blog.description
                                        .split(/\r?\n/)
                                        .filter(Boolean)
                                        .slice(0, 4)
                                        .map((paragraph, index, paragraphs) => (
                                            <p key={index} className={`content-pera text-[16px] md:text-[18px] text-[#000000] ${index === paragraphs.length - 1 ? 'mb-0' : ''}`}>
                                                {paragraph}
                                            </p>
                                        ))}
                                        </>
                                    )}
                                </div>
                                <div className="blog-detail-comment-wrap border-t border-[#DDDCDC] mt-[30px] md:mt-[50px] pt-[30px] md:pt-[45px]">
                                    <div className="section-title text-center text-[24px] md:text-[30px] font-semibold mb-[25px]">Comments</div>
                                    {isCommentsLoading && (
                                        <div className="text-center text-[18px] text-[#636363] mb-8">
                                            Loading comments...
                                        </div>
                                    )}
                                    {!isCommentsLoading && commentsError && (
                                        <div className="text-center text-[18px] text-[#E60000] mb-8">
                                            {commentsError}
                                        </div>
                                    )}
                                    {comments.map((comment) => (
                                        <div key={comment.id} className={`comment-box-wrap flex items-start mb-[40px] ${comment.level === 2 ? ' ml-6 md:ml-[50px]' : comment.level === 3 ? ' ml-10 md:ml-[100px]' : ''}`}>
                                            <div className="comment-box-wrap-icon min-w-[50px] md:min-w-[60px] mr-3 md:mr-[20px]">
                                                <img src={comment.image} alt="Comments User" className="w-full h-auto rounded-full" width="60" height="60" />
                                            </div>
                                            <div className="comment-box-wrap-content">
                                                <div className="comment-user text-[18px] md:text-[22px] font-medium leading-none text-[#000000] tracking-[0.5px] mb-[7px]">{comment.user}</div>
                                                <div className="comment-date text-[14px] md:text-[16px] leading-none text-[#000000] tracking-[0.5px] mb-[10px]">{comment.date}</div>
                                                <p className="content-pera text-[14px] md:text-[16px] mb-0">{comment.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="comment-box-form-wrap p-[30px] md:px-[50px] md:pt-[50px] md:pb-[70px] bg-[#E7E8E8] rounded-[20px]">
                                        <h2 className="section-title text-center text-[24px] md:text-[28px] font-normal leading-none mb-[10px]">Leave a Comment</h2>
                                        <p className="content-pera text-center text-[14px] md:text-[16px] text-[#6F6F6F] tracking-[0.2px] mb-[30px]">Your email address will not be published. Required fields are marked *</p>
                                        <form id="commentform" action="#" method="POST" className="max-w-[620px] mx-auto">
                                            <div className="flex flex-wrap -mx-4">
                                                <div className="w-full md:w-1/2 px-4">
                                                    <div className="input-group-wrap mb-[20px]">
                                                        <label htmlFor="yourname" className="block text-[14px] md:text-[16px] font-light leading-none tracking-[0.2px] text-[#000000] mb-[5px]">Your Name*</label>
                                                        <input type="text" id="yourname" className="form-control w-full text-[14px] md:text-[16px] font-light border border-[#F5F5F5] rounded-[30px] py-[7px] px-[20px] bg-white hover:border-[#FEC223] focus:border-[#FEC223] focus:outline-none focus:ring-0 transition-colors" name="yourname" />
                                                    </div>
                                                </div>
                                                <div className="w-full md:w-1/2 px-4">
                                                    <div className="input-group-wrap mb-[20px]">
                                                        <label htmlFor="youremail" className="block text-[14px] md:text-[16px] font-light leading-none tracking-[0.2px] text-[#000000] mb-[5px]">Your Email*</label>
                                                        <input type="text" id="youremail" className="form-control w-full text-[14px] md:text-[16px] font-light border border-[#F5F5F5] rounded-[30px] py-[7px] px-[20px] bg-white hover:border-[#FEC223] focus:border-[#FEC223] focus:outline-none focus:ring-0 transition-colors" name="youremail" />
                                                    </div>
                                                </div>
                                                <div className="w-full px-4">
                                                    <div className="input-group-wrap mb-[20px]">
                                                        <label htmlFor="writereview" className="block text-[14px] md:text-[16px] font-light leading-none tracking-[0.2px] text-[#000000] mb-[5px]">Write Review*</label>
                                                        <textarea id="writereview" className="form-control w-full text-[14px] md:text-[16px] font-light border border-[#F5F5F5] rounded-[10px] py-[7px] px-[20px] bg-white hover:border-[#FEC223] focus:border-[#FEC223] focus:outline-none focus:ring-0 min-h-[100px] resize-none transition-colors" name="writereview"></textarea>
                                                    </div>
                                                </div>
                                                <div className="w-full px-4">
                                                    <div className="input-group-wrap text-center mb-0">
                                                        <button type="submit" className="btn btn-primary red-button postcomment btn-hover-1"><span>Post Comment</span></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}

export default BlogDetails
