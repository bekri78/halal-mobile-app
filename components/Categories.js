import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CategoryCards from './CategoryCards'

const Categories = () => {
  return (
    <ScrollView 
    contentContainerStyle={{
        paddingHorizontal:15,
        paddingTop:10,
    }}
    horizontal
    showsHorizontalScrollIndicator={false}>
        <CategoryCards imgUrl="https://links.papareact.com/gn7" title="test"/>
        <CategoryCards imgUrl="https://links.papareact.com/gn7" title="test 2"/>
        <CategoryCards imgUrl="https://links.papareact.com/gn7" title="test 3"/>
        <CategoryCards imgUrl="https://links.papareact.com/gn7" title="test 3"/>
        <CategoryCards imgUrl="https://links.papareact.com/gn7" title="test 3"/>
        <CategoryCards imgUrl="https://links.papareact.com/gn7" title="test 3"/>
        <CategoryCards imgUrl="https://links.papareact.com/gn7" title="test 3"/>
   
    </ScrollView>
  )
}

export default Categories