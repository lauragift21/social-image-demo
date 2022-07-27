export default {
	async fetch(request, env) {

		const image = await fetch(
			`https://imagedelivery.net/${env.CLOUDFLARE_ACCOUNT_HASH}/${env.IMAGE_ID}/public`
		)
		const editedImage =  await fetch(image, {
			cf: {
				image: {
					width: 1280,
					height: 720,
					// TODO: Add a worker that automatically generate an image based on the params passed to it
					draw: [
						{
							url: 'https://github.com/lauragift21/social-image-demo/blob/main/src/pages.png'
						},
						{
							url: 'https://github.com/lauragift21/social-image-demo/blob/main/src/Wrangler%20Office%20Hours.png'
						}
					]
				}
			}
		})

		console.log(editedImage)

		return image
	}
}


// export const textGeneration = async (request) => {
// 	const url = new URL(request.url).searchParams
// 	const text = url.get('title')

// 	const image = generateImage(text)
// 	console.log(image)

// 	return new Response(text, {
// 		headers: {
// 			'content-type': 'image/png',
// 		},
// 	})
// }
