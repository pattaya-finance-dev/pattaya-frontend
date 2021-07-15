import React, { useContext } from 'react'
import { Menu as UikitMenu, ConnectorId } from '@pattayaswap-dev-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import { allLanguages } from 'constants/localisation/languageCodes'
import { LanguageContext } from 'hooks/LanguageContext'
import useTheme from 'hooks/useTheme'
import useGetPriceData from 'hooks/useGetPriceData'
// import useGetLocalProfile from 'hooks/useGetLocalProfile'
import { injected, bsc, walletconnect } from 'connectors'
import links from './config'

const Menu: React.FC = (props) => {
  const { account, activate, deactivate } = useWeb3React()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const priceData = useGetPriceData()

  const pantherAddress = '0xd7Cf8c8e4750972fcF40eec469a4DECEA1C92812'
  const cakePriceUsd = priceData && priceData.data && priceData.data[pantherAddress] ? Number(priceData.data[pantherAddress].price) : Number(0)
  // const profile = useGetLocalProfile()

  return (
    <UikitMenu
      links={links}
      account={account as string}
      login={(connectorId: ConnectorId) => {
        if (connectorId === 'walletconnect') {
          return activate(walletconnect)
        }

        if (connectorId === 'bsc') {
          return activate(bsc)
        }

        return activate(injected)
      }}
      logout={deactivate}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage?.code || ''}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={cakePriceUsd}
      cakePriceLink={`https://bscscan.com/token/${pantherAddress}`}
      /* profile={profile} */
      {...props}
    />
  )
}

export default Menu
