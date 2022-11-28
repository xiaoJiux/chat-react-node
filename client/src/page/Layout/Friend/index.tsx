import React, {useEffect, useState} from 'react';
import './index.less'
import {AutoComplete, Avatar, Badge, Input, message} from 'antd'
import {UsergroupAddOutlined, UserOutlined} from '@ant-design/icons';
import SelectF from "@/page/Layout/components/SelectF";
import {useStore} from "@/store";
import {$axios} from "@/utils";
import baseUrl from "@/utils/baseUrl";
import {observer} from "mobx-react-lite";

const Friend: React.FC = () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<{ username: string }[]>([]);
  const {friendStore} = useStore()
  const {userStore} = useStore()
  const {userInfo} = userStore

  const onSearch = async (searchText: string) => {
    if (searchText) {
      let {data, code, msg} = await $axios({
        method: "get",
        url: '/friend/search',
        params: {
          keyword: searchText
        }
      })
      if (code === 200) {
        setOptions(data)
      }
    }

  };
  //选中方法
  const onSelect = (data: string) => {
    console.log('onSelect', data, value);
  };
  //改变
  const onChange = (data: string) => {
    setValue(data);
  };

  let addFriend = async (username: string) => {
    if (!username) {
      return false
    }
    if (!userInfo) {
      return false
    }
    let {msg, code, data} = await $axios({
      url: '/friend/add',
      method: 'post',
      data: {
        username
      }
    })

    if (code === 200) {
      message.success(msg)
    } else {
      message.warn(msg)
    }

  }
  useEffect(() => {
    if (userInfo._id) {
      friendStore.getFriend()
    }
  }, [addFriend])
  return (
    <div id="friend">
      <header>
        {/*头像*/}
        <div className="userInfo">
          <Badge offset={[-6, 42]} color={userInfo.online ? "green" : 'red'} dot>
            <Avatar shape="circle" size={45} src={`${baseUrl}${userInfo.tx}`} icon={<UserOutlined/>}/>
          </Badge>
          <div className="name_state">
            <p className={"name"}>{userInfo.username}</p>
            <p className={userInfo.online ? "state" : "not-state"}>{userInfo.online ? '在线' : '离线'}</p>
          </div>
        </div>
        <div style={{display: "flex", alignItems: 'center'}}>
          <AutoComplete
            value={value}
            options={options}
            onSelect={onSelect}
            onSearch={onSearch}
            onChange={onChange}
          >
            <Input placeholder="find friends" allowClear style={{width: 160}}/>
          </AutoComplete>
          <div className='addBtn'>
            <UsergroupAddOutlined onClick={() => {
              addFriend(value)
            }} style={{fontSize: '22px', color: 'gray'}}/>
          </div>
        </div>
      </header>
      <div className="friend-list">
        <SelectF></SelectF>
      </div>
    </div>
  );
};

export default observer(Friend);
