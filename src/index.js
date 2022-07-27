/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {

		const image = await fetch(
			`https://imagedelivery.net/${env.CLOUDFLARE_ACCOUNT_HASH}/${env.IMAGE_ID}/public`
		)

		// generate image from url
		// textGeneration()

		// const editedImage =  await fetch(image, {
		// 	cf: {
		// 		image: {
		// 			width: 1280,
		// 			height: 720,
		// 			// TODO: Add a worker that automatically generate an image based on the params passed to it
		// 			draw: [
		// 				{
		// 					url: 'https://github.com/lauragift21/social-image-demo/blob/main/src/pages.png'
		// 				}
		// 			]
		// 		}
		// 	}
		// })

		// console.log(editedImage)

		return image
	}
}


export const textGeneration = async (request) => {
	const url = new URL(request.url).searchParams
	const text = url.get('title')

	const image = generateImage(text)
	console.log(image)

	return new Response(text, {
		headers: {
			'content-type': 'image/png',
		},
	})
}

const generateImage = async (text) => {
	// const image = await Jimp.read('')
	// const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK)

	// image.print(font, 0, 0, text)

	return image
}

