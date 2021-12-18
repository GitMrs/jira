import React from 'react';
import { ProjectList } from "./list";
import { SearchPanel } from "./search-panel";
import { useEffect, useState } from "react";
import { cleanObject, useMount, useDebounce } from 'utils';
import qs from 'qs'
export const ProjectListScreen = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [param, setParam] = useState({
    name: '',
    personId: ''
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([])
  const paramValue = useDebounce(param)
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(paramValue))}`).then(async (response) => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [paramValue])
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  })
  return <div>
    <SearchPanel param={param} setParam={setParam} users={users} />
    <ProjectList list={list} users={users} />
  </div>
};