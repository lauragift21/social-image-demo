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

      // Using a remote url from GitHub, Reason because image resizing doesnt work with a worker that stores images on cloudflare images
      const imageURL = "https://github.com/lauragift21/social-image-demo/blob/3f785c7361f77c092440e395638d60d43b069b23/src/cover.png?raw=true";

      // make the params dynamic
   
      for (const value of url.searchParams.values()) { 
        try {
          console.log(value)
          const editedImage = await fetch(imageURL, {
            cf: {
              image: {
                width: 1280,
                height: 720,
                draw: [
                  {
                    url: `https://text-to-image.examples.workers.dev/?${value}`, // draw this image
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
