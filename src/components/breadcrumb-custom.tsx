'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { translatePathname } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

function BreadCrumbCustom() {
  const paths = usePathname()
  const pathnames = paths.split('/').filter((path) => path)
  const pathItems = pathnames.map((path, index) => ({
    name: path,
    path: pathnames.slice(0, index + 1).join('/'),
    currentPath: index === pathnames.length - 1
  }))

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathItems.map((item, index) => (
          <Fragment key={index}>
            {item.currentPath ? (
              <BreadcrumbItem>
                <BreadcrumbPage>{translatePathname(item.name)}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${item.path}`}>{translatePathname(item.name)}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {index < pathItems.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadCrumbCustom
