export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Example 1: fetching image stored on Cloudflare
    if (url.pathname === '/original-image') {
      const image = await fetch(
        `https://imagedelivery.net/${env.CLOUDFLARE_ACCOUNT_HASH}/${IMAGE_ID}/public`
      );
      return image;
    }

    // Example 2: Using Image Resizing on image
    if (url.pathname === '/thumbnail') {
      // Using a remote url from GitHub, Reason because image resizing doesnt work with a worker that stores images on cloudflare images
      const imageURL = "https://github.com/lauragift21/social-image-demo/blob/4f7364eb1a8f8f61526fae154b8a85005f8ce7b9/src/cover.png?raw=true";

      // make the text on the image dynamic
      for (const title of url.searchParams.values()) {
        try {
          const editedImage = await fetch(imageURL, {
            cf: {
              image: {
                width: 1280,
                height: 720,
                draw: [
                  {
                    url: `https://text-to-image.examples.workers.dev/?${title}`, // draw this image
                    left: 50
                  }
                ],
              },
            },
          });
          return editedImage;
        } catch (error) {
          console.log(error);
        }
      }
    }
    return new Response('Image Resizing with a Worker');
  },
};
