"use client"
import { useState, useMemo } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import CourseCard from "@/components/course/CourseCard"
import EmptyState from "@/components/common/EmptyState"
import { getPublishedCourses } from "@/data/courses"
import { COURSE_CATEGORIES, COURSE_LEVELS, COURSE_SORT_OPTIONS } from "@/lib/constants"
import { useDebounce } from "@/hooks/useDebounce"

export default function CoursesPage() {
  const allCourses = getPublishedCourses()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [level, setLevel] = useState("all")
  const [sort, setSort] = useState("popular")
  const debouncedSearch = useDebounce(search, 300)

  const filtered = useMemo(() => {
    let result = allCourses.filter((c) => {
      const matchSearch = debouncedSearch === "" || c.title.toLowerCase().includes(debouncedSearch.toLowerCase()) || c.shortDescription.toLowerCase().includes(debouncedSearch.toLowerCase())
      const matchCat = category === "all" || c.category === category
      const matchLevel = level === "all" || c.level === level
      return matchSearch && matchCat && matchLevel
    })
    if (sort === "rating") result = [...result].sort((a, b) => b.rating - a.rating)
    else if (sort === "newest") result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    else if (sort === "price_asc") result = [...result].sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price))
    else if (sort === "price_desc") result = [...result].sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price))
    else result = [...result].sort((a, b) => b.studentCount - a.studentCount)
    return result
  }, [allCourses, debouncedSearch, category, level, sort])

  const hasFilters = category !== "all" || level !== "all" || search !== ""

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      {/* page header */}
      <div className="bg-slate-900 text-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Browse All Courses</h1>
          <p className="text-slate-400">Explore 500+ expert-led courses across 8 categories.</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 p-4 bg-white dark:bg-slate-800 rounded-xl border">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Search courses..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full lg:w-48"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {COURSE_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="w-full lg:w-40"><SelectValue placeholder="Level" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {COURSE_LEVELS.map((l) => <SelectItem key={l} value={l} className="capitalize">{l}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full lg:w-44"><SelectValue placeholder="Sort by" /></SelectTrigger>
            <SelectContent>
              {COURSE_SORT_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={() => { setSearch(""); setCategory("all"); setLevel("all") }} className="gap-1 shrink-0">
              <X className="h-4 w-4" /> Clear
            </Button>
          )}
        </div>

        {/* results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-900 dark:text-white">{filtered.length}</span> courses
          </p>
          <div className="flex gap-2 flex-wrap">
            {category !== "all" && <Badge variant="secondary" className="gap-1">{category} <button onClick={() => setCategory("all")}><X className="h-3 w-3" /></button></Badge>}
            {level !== "all" && <Badge variant="secondary" className="gap-1 capitalize">{level} <button onClick={() => setLevel("all")}><X className="h-3 w-3" /></button></Badge>}
          </div>
        </div>

        {/* grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => <CourseCard key={course.id} course={course} />)}
          </div>
        ) : (
          <EmptyState icon={Search} title="No courses found" description="Try adjusting your search or filters." />
        )}
      </div>
    </div>
  )
}
