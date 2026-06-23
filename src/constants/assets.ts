import backIcon from '../assets/back.svg'
import dropoffIcon from '../assets/dropoff.svg'
import fclIcon from '../assets/fcl.svg'
import ftlIcon from '../assets/ftl.svg'
import completedIcon from '../assets/completed.svg'
import holdIcon from '../assets/hold.svg'
import logoIcon from '../assets/image.png'
import notiIcon from '../assets/noti.svg'
import orderCheckIcon from '../assets/orderCheck.svg'
import orderPickIcon from '../assets/orderPick.svg'
import pickupIcon from '../assets/pickup.svg'
import resumeIcon from '../assets/resume.svg'

export const ASSETS = {
  back: backIcon,
  dropoff: dropoffIcon,
  fcl: fclIcon,
  ftl: ftlIcon,
  completed: completedIcon,
  hold: holdIcon,
  logo: logoIcon,
  noti: notiIcon,
  orderCheck: orderCheckIcon,
  orderPick: orderPickIcon,
  pickup: pickupIcon,
  resume: resumeIcon,
} as const

export function getOrderTypeIcon(type: string): string {
  return type === 'FCL' ? ASSETS.fcl : ASSETS.ftl
}
