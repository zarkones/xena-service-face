import { NuxtAxiosInstance } from '@nuxtjs/axios'

export type BuildTemplate = 'XENA_APEP' | 'XENA_RA'

export default new class Pyramid {
  public readonly axios: NuxtAxiosInstance

  constructor (axios?: NuxtAxiosInstance) {
    this.axios = axios
  }

  public getBuilldProfiles = (axios: NuxtAxiosInstance) => axios({
      method: 'GET',
      url: `${process.env.XENA_PYRAMID_HOST}/build-profiles`,
    })
    .catch(err => console.warn(err))
    .then(resp => {
      if (resp)
        return resp.data
    })

  public insertBuildProfile = (
    axios: NuxtAxiosInstance,
    name: string,
    description: string | null,
    gitUrl: string,
    template: BuildTemplate,
  ) => axios({
      method: 'POST',
      url: `${process.env.XENA_PYRAMID_HOST}/build-profiles`,
      data: {
        name,
        description,
        gitUrl,
        config: {
          template,
        },
        status: 'ENABLED'
      },
    })
    .catch(err => console.warn(err))
    .then(resp => {
      if (resp)
        return resp.data
    })
}
