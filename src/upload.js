export default {
  async fetch(env) {

    const formData = new FormData()
    formData.append('url', 'https://github.com/lauragift21/social-image-demo/blob/main/src/cover.png')

    const init = {
      method: "POST",
      headers: {
        'Content-Type': `multipart/form-data; boundary='${formData._boundary}`,
        "Authorization": `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
      },
      formData
    };

    try {
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/images/v1`,
        init
      );

      return res;
    } catch (error) {
      console.log(error)
    }

    return new Response("Image successfully uploaded!");
  },
};
