export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/original-image') {
      const image = await fetch(
        `https://imagedelivery.net/${env.CLOUDFLARE_ACCOUNT_HASH}/6b0e914d-ffce-4ec2-6c72-15b34a5d4500/public`
      );
      return image;
    }

    if (url.pathname === '/thumbnail') {
      const imageURL = `https://imagedelivery.net/${env.CLOUDFLARE_ACCOUNT_HASH}/${env.IMAGE_ID}/public`;

      // TODO: Make image resizing work as expected. It worked once, I just need to do it again.

      try {
        const editedImage = await fetch(imageURL, {
          cf: {
            image: {
              width: 800,
              height: 600,
              draw: [
                {
                  url: 'https://text-to-image.examples.workers.dev', // draw this image
                  bottom: 5, // 5 pixels from the bottom edge
                  right: 5, // 5 pixels from the right edge
                  fit: 'contain', // make it fit within 100x50 area
                  width: 100,
                  height: 50,
                  opacity: 0.8, // 20% transparent
                },
              ],
            },
          },
        });
        return editedImage;
      } catch (error) {
        console.log(error);
      }
    }
    return new Response('Image Resizing with a Worker');
  },
};
