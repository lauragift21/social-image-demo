export default {
	async fetch(request, env) {

		const image = await fetch(
			`https://imagedelivery.net/${env.CLOUDFLARE_ACCOUNT_HASH}/${env.IMAGE_ID}/public`
		)
		// const editedImage =  await fetch(image, {
		// 	cf: {
		// 		image: {
		// 			width: 580,
		// 			height: 320,
		// 			draw: [
		// 				{
		// 					url: 'https://github.com/lauragift21/social-image-demo/blob/main/src/Wrangler%20Office%20Hours.png?raw=true'
		// 				}
		// 			]
		// 		}
		// 	}
		// })

		// console.log(editedImage)

		return image
	}
}
