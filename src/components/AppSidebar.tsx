import React, { FC } from 'react'
import {Link as LinkR} from 'react-router-dom'
import {FaBars,FaGithub,FaUser,FaSignOutAlt,FaTimes} from 'react-icons/fa'
import styled from 'styled-components'

import {useAppSelector,useAppDispatch} from '../store/store'
import { signOut } from '../store/slices/authSlice';

interface AppSidebarProps {
    isOpen:boolean,
    toggle():any,
    scrollWithOffset(el:any, offset:number):any
}

interface SidebarContainerProps{
    isOpen:boolean
}

const AppSidebar:FC<AppSidebarProps> = ({isOpen,toggle,scrollWithOffset}) => {
    const dispatch = useAppDispatch()
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
    <Icon onClick={toggle}>
        <CloseIcon/>
    </Icon>
    <SidebarWrapper>
        <SidebarMenu>
            <SidebarLink to='/'>
                Home
            </SidebarLink>
            <SidebarLink to='/store' >
                Reserve Now
            </SidebarLink>
            {localStorage.getItem('token')?
            <SidebarLink to='/history' >
                My History
            </SidebarLink>:
            null
            }
            {/* <SidebarLink to='#section4' >
            Section 4
            </SidebarLink>
            <SidebarLink to='#section5' >
            Section 5
            </SidebarLink> */}
        </SidebarMenu>
        <SideBtnWrap>
            {localStorage.getItem('token')?
            <SidebarRoute onClick={()=>dispatch(signOut())}>
                <FaSignOutAlt size={18}/>
                    Sign Out
            </SidebarRoute>
            :<>
            <SidebarRoute href='/signin'>
                <FaUser size={18}/>
                    Sign In
            </SidebarRoute>
                <SidebarRoute href='/signup' >
                <FaUser size={18}/>
                    New Account
            </SidebarRoute>
            </>
        }
        </SideBtnWrap>
    </SidebarWrapper>
</SidebarContainer>
  )
}

export default AppSidebar


const SidebarContainer  = styled.aside<SidebarContainerProps> `  
    position:fixed;
    z-index:999;
    width:100%;
    height:100%;
    background:#7E370C;
    display:grid;
    align-items:center;
    top:0;
    left:0;
    transition: 0.3s ease-in-out;
    opacity: ${({isOpen})=>(isOpen? '100%':'0')};
    top:${({isOpen})=>(isOpen?'0':'-100%')};
`

const CloseIcon = styled(FaTimes)`
    color:#fff;
`

const Icon = styled.div`
    position:absolute;
    top:1.2rem;
    right:1.5rem;
    background:transparent;
    font-size:2rem;
    cursor: pointer;
    outline:none;
`

const SidebarWrapper = styled.div`
    color:#fff !important;
`

const SidebarMenu = styled.ul`
    display:grid;
    grid-template-columns:1fr;
    grid-template-rows:repeat(6,80px);
    text-align:center;
    padding-inline-start:0px !important;
    @media screen and (max-width: 480px){
        grid-template-rows:repeat(6,60px)
    }
`

const SidebarLink = styled(LinkR)`
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:1.5rem;
    text-decoration:none;
    list-style:none;
    transition:0.2s ease-in-out;
    text-decoration:none;
    color:#fff;
    cursor: pointer;

    &:hover{
        //color:#256ce1;
        transition:0.2s ease-in-out
    }
`

const SideBtnWrap = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    row-gap:1rem;
`

const SidebarRoute = styled.a`
    border-radius:50px;
    background:#E2C275;
    width:50%;
    white-space:nowrap;
    padding:16px 10px;
    color:#010606;
    font-size:16px;
    outline:none;
    cursor:pointer;
    transition:all 0.2s ease-in-out;
    text-decoration:none;
    color:#fff;
    display:flex;
    justify-content:center;
    align-items:center;
    gap:0.5rem;
    &:hover{
        transition:all 0.2s ease-in-out;
        background:#fff;
        color:#010606;
    }
`