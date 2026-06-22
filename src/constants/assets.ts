import backIcon from '../assets/back.svg'
import dropoffIcon from '../assets/dropoff.svg'
import fclIcon from '../assets/fcl.svg'
import ftlIcon from '../assets/ftl.svg'
import notiIcon from '../assets/noti.svg'
import pickupIcon from '../assets/pickup.svg'
import resumeIcon from '../assets/resume.svg'

export const ASSETS = {
  back: backIcon,
  dropoff: dropoffIcon,
  fcl: fclIcon,
  ftl: ftlIcon,
  noti: notiIcon,
  pickup: pickupIcon,
  resume: resumeIcon,
} as const

export function getOrderTypeIcon(type: string): string {
  return type === 'FCL' ? ASSETS.fcl : ASSETS.ftl
}
