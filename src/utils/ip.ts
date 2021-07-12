import publicIp from 'public-ip'

export async function getIp() {
  return await publicIp.v4()
}
