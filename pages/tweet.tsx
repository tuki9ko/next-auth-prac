import { TwitterApi } from 'twitter-api-v2'
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { NodeNextRequest } from 'next/dist/server/base-http/node'
import { useRouter } from 'next/router'
import Link from 'next/link'

type Props = {
    id?: string
    text?: string
}

const Tweet = (props: Props) => {
    return (
        <>
            Id: {props.id}<br />
            Tweet: {props.text}<br />
            <Link href="/">戻る</Link>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)

    const props: Props = {
        id: 'none',
        text: 'none'
    }
    if(session && typeof(session.accessToken) === "string"){
        console.log('token: ', session.accessToken)
        const twitterClient = new TwitterApi(session.accessToken)
        const rwClient = twitterClient.readWrite

        // TODO: Access Token 取得時、scope に tweet.write を指定しないと 403 返ってくる
        const { data: createdTweet } = await rwClient.v2.tweet('てすと')
        console.log('Tweet', createdTweet.id, ':', createdTweet.text)

        props.id = createdTweet.id
        props.text = createdTweet.text
    }

    return {
        props: props
    }
}

export default Tweet;